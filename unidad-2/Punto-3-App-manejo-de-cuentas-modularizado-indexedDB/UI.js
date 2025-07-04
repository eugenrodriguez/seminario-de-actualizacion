import { Rol } from './model.js';

class UI {
    constructor(model) {
        this.model = model;
    }

    pedirInput(mensaje){
        let entrada;
        do{
            entrada = prompt(mensaje);
            if (entrada === null) return null;
            if (entrada.trim() === ""){
                alert("Este campo no puede estar vacio");
            }
        } while (entrada.trim() === "");
        return entrada;
    }

    pedirNumeroInput(mensaje) {
        let entrada;
        let numero;
        do {
            entrada = this.pedirInput(mensaje);
            if (entrada === null) return null;
            numero = parseFloat(entrada);
            if (isNaN(numero)) {
                alert("Debe ingresar un número válido");
            }
        } while (isNaN(numero));
        return numero;
    }

    menuDeInicio() {
        let op;
        do {
            op = prompt(
                "----------------Menu de inicio---------------\n" +
                "1. Iniciar sesion\n" +
                "0. Salir\n" +
                "Seleccione una opcion:");

            switch (parseInt(op)) {
                case 1:
                    this.login();
                    break;
                case 0:
                    alert("Saliendo del sistema...");
                    return false;
                default:
                    alert("Opcion invalida.");
            }
        } while (true);
    }

    login() {
        let intentos = 0;
        const max_intentos = 3;

        while (intentos < max_intentos) {
            const usuario = this.pedirInput("Usuario:");
            if (usuario === null) return;

            
            const contrasenia = this.pedirInput("Contraseña:");
            if (contrasenia === null) return;
            

            if (this.model.corroborar(usuario, contrasenia)) {
                alert(`¡Bienvenido/a ${usuario}!`);
                this.menuUsuarioAutenticado(usuario);
                return;
            } else {
                intentos++;
                alert("Usuario y/o contraseña incorrecta.");
            }

            if (intentos === max_intentos) {
                alert("Usuario bloqueado. Contacte al administrador.");
                return;
            }
        }
    }

    menuUsuarioAutenticado(usuario) {
        const rol = this.model.getRol(usuario);
        let op;
        do {
            let menu = "MENU DE USUARIO\n";
            menu += "1. Cambiar contraseña\n";
            menu += "2. Gestion de articulos\n";
            if (rol === Rol.Administrador) {
                menu += "3. Gestion de usuarios\n";
            }
            menu += "0. Cerrar sesión\n";
            menu += "Seleccione una opción: ";

            op = prompt(menu);

            switch (parseInt(op)) {
                case 1:
                    this.cambiarContrasenia(usuario);
                    break;
                case 2:
                    this.menuDeArticulos(usuario);
                    break;
                case 3:
                    if (rol === Rol.Administrador) {
                        this.menuGestionUsuarios();
                    } else {
                        alert("Acceso denegado. Solo administradores pueden gestionar usuarios.");
                    }
                    break;
                case 0:
                    alert("Cerrando sesión...");
                    return;
                default:
                    alert("Opción no válida. Intente nuevamente.");
            }
        } while (true);
    }

    cambiarContrasenia(usuario) {
        while (true) {
            const nueva = prompt("Ingrese la nueva contraseña:");
            if (nueva === null) {
            alert("Cambio de contraseña cancelado.");
            break;  
            }
            if (this.model.contraseniaSegura(nueva)) {
                this.model.cambiarContrasenia(usuario, nueva);
                alert("Contraseña cambiada con éxito.");
                break;
            } else {
                alert("La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales.");
            }
        }
    }

    menuGestionUsuarios() {
        let op;
        do {
            op = prompt(
                "--------------- Gestion de Usuarios ---------------\n" +
                "1. Agregar usuario\n" +
                "2. Eliminar usuario\n" +
                "0. Volver\n" +
                "Seleccione una opción: ");

            switch (parseInt(op)) {
                case 1:
                    this.registrarUsuario();
                    break;
                case 2:
                    const usuario = this.pedirInput("Usuario:");
                    if (usuario === null) return;
                    
                    if (this.model.eliminarUsuario(usuario)) {
                        alert("Usuario eliminado con éxito.");
                    } else {
                        alert("No se encontró el usuario.");
                    }
                    break;
                case 0:
                    return;
                default:
                    alert("Opción inválida.");
            }
        } while (true);
    }

    registrarUsuario() {
        const usuario = this.pedirInput("Usuario:");
        if (usuario === null) return;

        let contrasenia;
        do{
            contrasenia = this.pedirInput("Contraseña:");
            if (contrasenia === null) return;

            if (!this.model.contraseniaSegura(contrasenia)) {
                alert("La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales. Intente nuevamente.");
            }
        } while (!this.model.contraseniaSegura(contrasenia));

        let rolSeleccionado;
        do {
            const rolInput = this.pedirInput(
                "Seleccione el rol del usuario:\n" +
                "(1) Administrador.\n" +
                "(2) Cliente.\n" +
                "(3) Vendedor.\n" +
                "(4) Trabajador de deposito.");
            if (rolInput === null) return;

            rolSeleccionado = parseInt(rolInput);
            if (isNaN(rolSeleccionado) || rolSeleccionado < 1 || rolSeleccionado > 4) {
                alert("Rol inválido. Debe ser un número entre 1 y 4");
            }
        } while (isNaN(rolSeleccionado) || rolSeleccionado < 1 || rolSeleccionado > 4);

        const rol = rolSeleccionado - 1;
        this.model.registrarUsuario(usuario, contrasenia, rol);
        alert("Usuario registrado con éxito.");
    }

    menuDeArticulos(usuario) {
        const rol = this.model.getRol(usuario);
        let op;
        do {
            let menu = "---------------Menu de Articulos----------------\n";
            menu += "1. Listar articulos\n";
            if (rol === Rol.Administrador || rol === Rol.TrabajadorDeposito) {
                menu += "2. Cargar articulo\n";
                menu += "4. Eliminar articulo\n";
            }
            if (rol === Rol.Administrador || rol === Rol.Vendedor || rol === Rol.TrabajadorDeposito) {
                menu += "3. Editar articulo\n";
            }
            if (rol === Rol.Administrador || rol === Rol.Vendedor || rol === Rol.Cliente) {
                menu += "5. Comprar articulo\n";
            }
            menu += "0. Volver al menu principal\n";
            menu += "Seleccione una opcion:";

            op = prompt(menu);

            if (op === null) {
                alert("Volviendo...");
                return;
            }

            switch (parseInt(op)) {
                case 1:
                    const lista = this.model.listarArticulos()
                        .map(([id, art]) => `ID: ${id} | Nombre: ${art.nombre} | Precio: $${art.precio} | Stock: ${art.stock}`)
                        .join("\n");
                    alert("---------------Listado de Articulos----------------\n" + lista);
                    break;
                case 2:
                    if (rol === Rol.Administrador || rol === Rol.TrabajadorDeposito) {
                        let id, existeId;
                        do{
                            id = this.pedirNumeroInput("Ingrese id del nuevo articulo:");
                            if (id === null) return;

                            // Verificar si el ID ya existe
                            const articulos = this.model.listarArticulos();
                            existeId = articulos.some(([articuloId]) => articuloId === id);
                            if (existeId) {
                                alert("Ya existe un artículo con ese ID. Ingrese otro ID.");
                                id = NaN;
                            }
                        } while ((isNaN(id)));
                        
                        const nombre = this.pedirInput("Nombre:");
                        if (nombre === null) return;

                        const precio = this.pedirNumeroInput("Precio:");
                        if (precio === null) return;

                        const stock = this.pedirNumeroInput("Stock:");
                        if (stock === null) return;
                        
                        this.model.cargarArticulo(id, nombre, precio, stock);
                        alert("Articulo agregado correctamente");
                    }
                    break;
                case 3:
                    if (rol === Rol.Administrador || rol === Rol.Vendedor || rol === Rol.TrabajadorDeposito) {

                        let idEditar;
                        let articuloExistente = false;
                        do {
                            idEditar = this.pedirNumeroInput("Id del articulo a editar:");
                            if (idEditar === null) return;
                        
                            articuloExistente = this.model.listarArticulos().some(([id]) => id === idEditar);
                            if (!articuloExistente) {
                                alert("No se encontró un artículo con ese ID. Intente nuevamente.");
                            }
                        } while (!articuloExistente);
                        
                        
                        const nombre = this.pedirInput("Nuevo nombre:");
                        if (nombre === null) return;

                        const precio = this.pedirNumeroInput("Nuevo precio:");
                        if (precio === null) return;
                        
                        const stock = this.pedirNumeroInput("Nuevo stock:");
                        if (stock === null) return;
                        
                        this.model.editarArticulo(idEditar, nombre, precio, stock);
                        alert("Artículo editado correctamente");
                    }
                    break;
                case 4:
                    if (rol === Rol.Administrador || rol === Rol.TrabajadorDeposito) {
                        const idEliminar = this.pedirNumeroInput("ID del articulo a eliminar:");
                        if (idEliminar === null) return;
                        
                        if (!this.model.eliminarArticulo(idEliminar)) {
                            alert("No se encontró el artículo con ese ID");
                        } else {
                            alert("Artículo eliminado con éxito");
                        }
                    }
                    break;
                case 5:
                    if (rol === Rol.Administrador || rol === Rol.Vendedor || rol === Rol.Cliente) {
                        const idCompra = this.pedirNumeroInput("ID del articulo a comprar:");
                        if (idCompra === null) return;
                                            
                        const cantidad = this.pedirNumeroInput("Cantidad a comprar:");
                        if (cantidad === null) return;
                        
                        if (!this.model.comprarArticulo(idCompra, cantidad)) {
                            alert("Compra inválida. Verifique stock y datos.");
                        } else {
                            alert("Compra realizada con éxito.");
                        }
                    }
                    break;
                case 0:
                    return;
                default:
                    alert("Opción inválida");
            }
        } while (true);
    }
}

export { UI };
