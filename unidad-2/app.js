

import { AppModel, Rol } from './app-Model.js';
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
                this.appUI.showAlert(`¡Bienvenido/a ${usuario}!`);
                this.currentUser = usuario;
                await this.menuUsuarioAutenticado(usuario);
                return; 
            } else {
                intentos++;
                this.appUI.showAlert("Usuario y/o contraseña incorrecta.");
            }

            if (intentos === max_intentos) {
                this.appUI.showAlert("Usuario bloqueado. Contacte al administrador.");
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
                this.appUI.showAlert("Contraseña cambiada con éxito.");
                success = true;
            } else {
                this.appUI.showAlert("La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales.");
            }
        }
    }


    async menuUsuarioAutenticado(usuario) {
        const rol = this.appModel.getRolUsuario(usuario);
        if (rol === undefined) {
            this.appUI.showAlert("Error: No se pudo obtener el rol del usuario.");
            return;
        }

        let op;
        do {
            const esAdmin = (rol === Rol.Administrador);
            op = this.appUI.mostrarMenuUsuarioAutenticado(esAdmin);

            if (op === null) { 
                this.appUI.showAlert("Saliendo al inicio del sistema...");
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
                        this.appUI.showAlert("Acceso denegado. Solo administradores pueden gestionar usuarios.");
                    }
                    break;
                case 0:
                    this.appUI.showAlert("Saliendo al inicio del sistema...");
                    this.currentUser = null;
                    return;
                default:
                    this.appUI.showAlert("Opción no válida. Intente nuevamente.");
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
                    this.appUI.showAlert("Opción inválida.");
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
                this.appUI.showAlert("Selección de rol inválida.");
                return;
        }

        if (this.appModel.registrarUsuario(nombreDeUsuario, contrasenia, rol)) {
            this.appUI.showAlert("Usuario registrado con éxito.");
        } else {
            if (this.appModel.existeUsuario(nombreDeUsuario)) {
                this.appUI.showAlert("Ya existe un usuario con ese nombre. Intente con otro.");
            } else {
                this.appUI.showAlert("La contraseña no cumple con los requisitos de seguridad.");
            }
        }
    }


    async eliminarUsuario() {
        const usuarioAEliminar = this.appUI.getUsuarioAEliminar();
        if (usuarioAEliminar === null) return; 

        if (this.appModel.eliminarUsuario(usuarioAEliminar)) {
            this.appUI.showAlert("Usuario eliminado con éxito.");
        } else {
            this.appUI.showAlert("No se encontró el usuario.");
        }
    }


    async listarArticulos() {
        const lista = this.appModel.getListaArticulos();
        this.appUI.showAlert(lista);
    }


    async cargarArticulo() {
        const id = this.appUI.getArticuloID();
        if (id === null || isNaN(id)) {
            if (id !== null) this.appUI.showAlert("ID inválido.");
            return;
        }

        if (this.appModel.getArticulo(id)) {
            this.appUI.showAlert("Ya existe un artículo con ese ID.");
            return;
        }

        const datosArticulo = this.appUI.getDatosNuevoArticulo();
        if (datosArticulo === null) return; 

        const { nombre, precio, stock } = datosArticulo;

        if (this.appModel.cargarArticulo(id, nombre, precio, stock)) {
            this.appUI.showAlert("Artículo agregado correctamente");
        } else {
            this.appUI.showAlert("Error al cargar el artículo. Verifique los datos.");
        }
    }


    async editarArticulo() {
        const id = this.appUI.getArticuloID();
        if (id === null || isNaN(id)) {
            if (id !== null) this.appUI.showAlert("ID inválido.");
            return;
        }

        const articulo = this.appModel.getArticulo(id);
        if (!articulo) {
            this.appUI.showAlert("No se encontró el artículo con ese ID.");
            return;
        }

        const datosEditados = this.appUI.getDatosEditarArticulo(articulo);
        if (datosEditados === null) return; 

        const { nuevoNombre, nuevoPrecio, nuevoStock } = datosEditados;

        if (this.appModel.editarArticulo(id, nuevoNombre, nuevoPrecio, nuevoStock)) {
            this.appUI.showAlert("Artículo editado correctamente.");
        } else {
            this.appUI.showAlert("Error al editar el artículo.");
        }
    }


    async eliminarArticulo() {
        const id = this.appUI.getArticuloID();
        if (id === null || isNaN(id)) {
            if (id !== null) this.appUI.showAlert("ID inválido.");
            return;
        }

        if (this.appModel.eliminarArticulo(id)) {
            this.appUI.showAlert("Artículo eliminado con éxito.");
        } else {
            this.appUI.showAlert("No se encontró ningún artículo con ese ID.");
        }
    }


    async comprarArticulo() {
        const id = this.appUI.getArticuloID();
        if (id === null || isNaN(id)) {
            if (id !== null) this.appUI.showAlert("ID inválido.");
            return;
        }

        const articulo = this.appModel.getArticulo(id);
        if (!articulo) {
            this.appUI.showAlert("No se encontró ningún artículo con ese ID.");
            return;
        }

        const cantidad = this.appUI.getCantidadAComprar(articulo);
        if (cantidad === null || isNaN(cantidad)) {
            if (cantidad !== null) this.appUI.showAlert("Cantidad inválida.");
            return;
        }

        const resultado = this.appModel.comprarArticulo(id, cantidad);
        this.appUI.showAlert(resultado.message);
    }


    async menuDeArticulos(usuario) {
        const rol = this.appModel.getRolUsuario(usuario);
        if (rol === undefined) {
            this.appUI.showAlert("Error: No se pudo obtener el rol del usuario.");
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
                        this.appUI.showAlert("Acción no permitida para su rol.");
                    }
                    break;
                case 3:
                    if (rol === Rol.Administrador || rol === Rol.Vendedor || rol === Rol.TrabajadorDeposito) {
                        await this.editarArticulo();
                    } else {
                        this.appUI.showAlert("Acción no permitida para su rol.");
                    }
                    break;
                case 4:
                    if (rol === Rol.Administrador || rol === Rol.TrabajadorDeposito) {
                        await this.eliminarArticulo();
                    } else {
                        this.appUI.showAlert("Acción no permitida para su rol.");
                    }
                    break;
                case 5:
                    if (rol === Rol.Administrador || rol === Rol.Vendedor || rol === Rol.Cliente) {
                        await this.comprarArticulo();
                    } else {
                        this.appUI.showAlert("Acción no permitida para su rol.");
                    }
                    break;
                case 0:
                    return; 
                default:
                    this.appUI.showAlert("Opción inválida.");
                    break;
            }
        } while (true);
    }


    async mainLoop() {
        while (true) {
            const op = this.appUI.mostrarMenuInicio();

            if (op === null) { 
                this.appUI.showAlert("Saliendo del sistema...");
                return;
            }

            switch (op) {
                case 1:
                    await this.login();
                    break;
                case 0:
                    this.appUI.showAlert("Saliendo del sistema...");
                    return;
                default:
                    this.appUI.showAlert("Opción inválida.");
            }
        }
    }
}

window.onload = () => {
    const app = new App();
    app.mainLoop();
};