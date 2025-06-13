                                                                                        
import { AppModel, Rol } from './appModel.js';
import { AppUI } from './appUI.js';


class App {
    constructor() {
        this.appModel = new AppModel();
        this.appUI = new AppUI();
        this.currentUser = null; 
    }


    async login() {
        let intentos = 0;
        const max_intentos = 3;

        while (intentos < max_intentos) {
            const usuario = this.appUI.getPromptInput("Usuario:");
            if (usuario === null) return; 
            const contrasenia = this.appUI.getPromptInput("Contraseña:");
            if (contrasenia === null) return; 

            if (this.appModel.corroborarCredenciales(usuario, contrasenia)) {
                this.appUI.showWelcomeMessage(usuario); 
                this.currentUser = usuario;
                await this.menuUsuarioAutenticado(usuario);
           
            } else {
                intentos++;
                this.appUI.showLoginError(); 
            }

            if (intentos === max_intentos) {
                this.appUI.showUserBlocked(); 
                return;
            }
        }
    }


    async cambiarContrasenia(usuario) {
        let success = false;
        while (!success) {
            const nuevaContrasenia = this.appUI.getNuevaContrasenia();
            if (nuevaContrasenia === null) return; 

            if (this.appModel.cambiarContrasenia(usuario, nuevaContrasenia)) {
                this.appUI.showPasswordChangeSuccess(); 
                success = true;
            } else {
                this.appUI.showPasswordRequirements();
            }
        }
    }


    async menuUsuarioAutenticado(usuario) {
        const rol = this.appModel.getRolUsuario(usuario);
        if (rol === undefined) {
            this.appUI.showRoleErrorMessage(); 
            return;
        }

        let op;
        do {
            const esAdmin = (rol === Rol.Administrador);
            op = this.appUI.mostrarMenuUsuarioAutenticado(esAdmin);

            if (op === null) { 
                this.appUI.showExitingToStartMessage();
                this.currentUser = null;
                return;
            }

            switch (op) {
                case 1:
                    await this.cambiarContrasenia(usuario);
                    break;
                case 2:
                    await this.menuDeArticulos(usuario);
                    break;
                case 3:
                    if (rol === Rol.Administrador) {
                        await this.menuGestionUsuarios();
                    } else {
                        this.appUI.showAdminAccessDenied(); 
                    }
                    break;
                case 0:
                    this.appUI.showExitingToStartMessage();
                    this.currentUser = null;
                    return;
                default:
                    this.appUI.showInvalidOption();     
            }
        } while (true);
    }


    async menuGestionUsuarios() {
        let op;
        do {
            op = this.appUI.mostrarMenuGestionUsuarios();

            if (op === null) return; 

            switch (op) {
                case 1:
                    await this.registrarUsuario();
                    break;
                case 2:
                    await this.eliminarUsuario();
                    break;
                case 0:
                    return; 
                default:
                    this.appUI.showInvalidOption(); 
            }
        } while (true);
    }


    async registrarUsuario() {
        const datosUsuario = this.appUI.getDatosNuevoUsuario();
        if (datosUsuario === null) return; 

        const { nombreDeUsuario, contrasenia, rolSeleccionado } = datosUsuario;

        let rol;
        switch (rolSeleccionado) {
            case 1: rol = Rol.Administrador; break;
            case 2: rol = Rol.Cliente; break;
            case 3: rol = Rol.Vendedor; break;
            case 4: rol = Rol.TrabajadorDeposito; break;
            default:
                this.appUI.showInvalidRoleSelection(); 
                return;
        }

        if (this.appModel.registrarUsuario(nombreDeUsuario, contrasenia, rol)) {
            this.appUI.showUserRegisteredSuccess(); 
        } else {
            if (this.appModel.existeUsuario(nombreDeUsuario)) {
                this.appUI.showUsernameAlreadyExists(); 
            } else {
                this.appUI.showPasswordRequirements(); 
            }
        }
    }


    async eliminarUsuario() {
        const usuarioAEliminar = this.appUI.getUsuarioAEliminar();
        if (usuarioAEliminar === null) return; 

        if (this.appModel.eliminarUsuario(usuarioAEliminar)) {
            this.appUI.showUserDeletedSuccess(); 
        } else {
            this.appUI.showUserNotFound(); 
        }
    }


    async listarArticulos() {
        const lista = this.appModel.getListaArticulos();
        this.appUI.showArticulosList(lista); 
    }


    async cargarArticulo() {
        const id = this.appUI.getArticuloID();
        if (id === null || isNaN(id)) {
            if (id !== null) this.appUI.showInvalidID(); 
            return;
        }

        if (this.appModel.getArticulo(id)) {
            this.appUI.showArticleAlreadyExists(); 
            return;
        }

        const datosArticulo = this.appUI.getDatosNuevoArticulo();
        if (datosArticulo === null) return; 

        const { nombre, precio, stock } = datosArticulo;

        if (this.appModel.cargarArticulo(id, nombre, precio, stock)) {
            this.appUI.showArticleAddedSuccess(); 
        } else {
            this.appUI.showArticleAddError(); 
        }
    }


    async editarArticulo() {
        const id = this.appUI.getArticuloID();
        if (id === null || isNaN(id)) {
            if (id !== null) this.appUI.showInvalidID(); 
            return;
        }

        const articulo = this.appModel.getArticulo(id);
        if (!articulo) {
            this.appUI.showArticleNotFound(); 
            return;
        }

        const datosEditados = this.appUI.getDatosEditarArticulo(articulo);
        if (datosEditados === null) return; 

        const { nuevoNombre, nuevoPrecio, nuevoStock } = datosEditados;

        if (this.appModel.editarArticulo(id, nuevoNombre, nuevoPrecio, nuevoStock)) {
            this.appUI.showArticleEditedSuccess(); 
        } else {
            this.appUI.showArticleEditError(); 
        }
    }


    async eliminarArticulo() {
        const id = this.appUI.getArticuloID();
        if (id === null || isNaN(id)) {
            if (id !== null) this.appUI.showInvalidID(); 
            return;
        }

        if (this.appModel.eliminarArticulo(id)) {
            this.appUI.showArticleDeletedSuccess(); 
        } else {
            this.appUI.showArticleNotFound(); 
        }
    }


    async comprarArticulo() {
        const id = this.appUI.getArticuloID();
        if (id === null || isNaN(id)) {
            if (id !== null) this.appUI.showInvalidID(); 
            return;
        }

        const articulo = this.appModel.getArticulo(id);
        if (!articulo) {
            this.appUI.showArticleNotFound(); 
            return;
        }

        const cantidad = this.appUI.getCantidadAComprar(articulo);
        if (cantidad === null || isNaN(cantidad)) {
                if (cantidad !== null) this.appUI.showInvalidQuantity(); 
            return;
        }

        const resultado = this.appModel.comprarArticulo(id, cantidad);
        switch (resultado) {
            case 'success':
                this.appUI.showPurchaseSuccess();
                break;
            case 'not_found':
                this.appUI.showArticleNotFound(); 
                break;
            case 'invalid_quantity':
                this.appUI.showPurchaseInvalidQuantity();
                break;
            case 'insufficient_stock':
                this.appUI.showPurchaseInsufficientStock();
                break;
            default:
                this.appUI.showErrorMessage("Error desconocido al procesar la compra."); 
        }
    }


    async menuDeArticulos(usuario) {
        const rol = this.appModel.getRolUsuario(usuario);
        if (rol === undefined) {
            this.appUI.showRoleErrorMessage(); 
            return;
        }

        let op;
        do {
            op = this.appUI.mostrarMenuArticulos(rol, Rol);

            if (op === null) return; 

            switch (op) {
                case 1:
                    await this.listarArticulos();
                    break;
                case 2:
                    if (rol === Rol.Administrador || rol === Rol.TrabajadorDeposito) {
                        await this.cargarArticulo();
                    } else {
                        this.appUI.showActionNotAllowed(); 
                    }
                    break;
                case 3:
                    if (rol === Rol.Administrador || rol === Rol.Vendedor || rol === Rol.TrabajadorDeposito) {
                        await this.editarArticulo();
                    } else {
                        this.appUI.showActionNotAllowed(); 
                    }
                    break;
                case 4:
                    if (rol === Rol.Administrador || rol === Rol.TrabajadorDeposito) {
                        await this.eliminarArticulo();
                    } else {
                        this.appUI.showActionNotAllowed(); 
                    }
                    break;
                case 5:
                    if (rol === Rol.Administrador || rol === Rol.Vendedor || rol === Rol.Cliente) {
                        await this.comprarArticulo();
                    } else {
                        this.appUI.showActionNotAllowed(); 
                    }
                    break;
                case 0:
                    return; 
                default:
                    this.appUI.showInvalidOption(); 
                    break;
            }
        } while (true);
    }


    async mainLoop() {
        while (true) {
            const op = this.appUI.mostrarMenuInicio();

            if (op === null) { 
                this.appUI.showExitingSystemMessage(); 
                return;
            }

            switch (op) {
                case 1:
                    await this.login();
                    break;
                case 0:
                    this.appUI.showExitingSystemMessage(); 
                    return;
                default:
                    this.appUI.showInvalidOption(); 
            }
        }
    }
}


window.onload = () => {
    const app = new App();
    app.mainLoop();
};
