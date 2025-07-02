import { Rol } from './model.js';

class UI {
    constructor(model) {
        this.model = model;
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
                    return;
                case 0:
                    alert("Saliendo del sistema...");
                    return;
                default:
                    alert("Opcion invalida.");
            }
        } while (true);
    }

    login() {
        let usuario, contrasenia;
        let intentos = 0;
        const max_intentos = 3;

        while (intentos < max_intentos) {
            usuario = prompt("Usuario:");
            contrasenia = prompt("Contraseña:");

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
            menu += "0. Salir\n";
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
                    alert("Saliendo al inicio del sistema...");
                    return;
                default:
                    alert("Opción no válida. Intente nuevamente.");
            }
        } while (true);
    }

    cambiarContrasenia(usuario) {
        let nueva;
        while (true) {
            nueva = prompt("Ingrese la nueva contraseña:");
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
                    const usuario = prompt("Ingrese el nombre de usuario a eliminar:");
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
        const usuario = prompt("Nombre de usuario:");
        let contrasenia;
        do {
            contrasenia = prompt("Contrasenia:");
            if (!this.model.contraseniaSegura(contrasenia)) {
                alert("La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales. Intente nuevamente.");
            }
        } while (!this.model.contraseniaSegura(contrasenia));

        let rolSeleccionado;
        do {
            rolSeleccionado = parseInt(prompt(
                "Seleccione el rol del usuario:\n" +
                "(1) Administrador.\n" +
                "(2) Cliente.\n" +
                "(3) Vendedor.\n" +
                "(4) Trabajador de deposito."));
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

            switch (parseInt(op)) {
                case 1:
                    const lista = this.model.listarArticulos()
                        .map(([id, art]) => `ID: ${id} | Nombre: ${art.nombre} | Precio: $${art.precio} | Stock: ${art.stock}`)
                        .join("\n");
                    alert("---------------Listado de Articulos----------------\n" + lista);
                    break;
                case 2:
                    if (rol === Rol.Administrador || rol === Rol.TrabajadorDeposito) {
                        const id = parseInt(prompt("Ingrese ID del nuevo articulo:"));
                        const nombre = prompt("Nombre:");
                        const precio = parseFloat(prompt("Precio:"));
                        const stock = parseInt(prompt("Stock:"));
                        if (!this.model.cargarArticulo(id, nombre, precio, stock)) {
                            alert("Ya existe un articulo con ese ID.");
                        } else {
                            alert("Articulo agregado correctamente");
                        }
                    }
                    break;
                case 3:
                    if (rol === Rol.Administrador || rol === Rol.Vendedor || rol === Rol.TrabajadorDeposito) {
                        const idEditar = parseInt(prompt("ID del artículo a editar:"));
                        const nombre = prompt("Nuevo nombre:");
                        const precio = parseFloat(prompt("Nuevo precio:"));
                        const stock = parseInt(prompt("Nuevo stock:"));
                        if (!this.model.editarArticulo(idEditar, nombre, precio, stock)) {
                            alert("Artículo no encontrado.");
                        } else {
                            alert("Artículo editado correctamente");
                        }
                    }
                    break;
                case 4:
                    if (rol === Rol.Administrador || rol === Rol.TrabajadorDeposito) {
                        const idEliminar = parseInt(prompt("ID del artículo a eliminar:"));
                        if (!this.model.eliminarArticulo(idEliminar)) {
                            alert("No se encontró el artículo con ese ID");
                        } else {
                            alert("Artículo eliminado con éxito");
                        }
                    }
                    break;
                case 5:
                    if (rol === Rol.Administrador || rol === Rol.Vendedor || rol === Rol.Cliente) {
                        const idCompra = parseInt(prompt("ID del artículo a comprar:"));
                        const cantidad = parseInt(prompt("Cantidad a comprar:"));
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
