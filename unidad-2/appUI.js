
export class AppUI {
    constructor() {
    }

    showAlert(mensaje) {
        alert(mensaje);
    }


    getPromptInput(mensaje, valorPorDefecto = '') {
        return prompt(mensaje, valorPorDefecto);
    }


    mostrarMenuInicio() {
        const op = this.getPromptInput(
            "----------------Menu de inicio---------------\n" +
            "1. Iniciar sesion\n" +
            "0. Salir\n" +
            "Seleccione una opcion:"
        );
        return op !== null ? parseInt(op) : null;
    }


    mostrarMenuUsuarioAutenticado(esAdmin) {
        let menu = "MENU DE USUARIO\n";
        menu += "1. Cambiar contraseña\n";
        menu += "2. Gestion de articulos\n";
        if (esAdmin) {
            menu += "3. Gestion de usuarios\n";
        }
        menu += "0. Salir\n";
        menu += "Seleccione una opción: ";

        const op = this.getPromptInput(menu);
        return op !== null ? parseInt(op) : null;
    }


    mostrarMenuGestionUsuarios() {
        const op = this.getPromptInput(
            "--------------- Gestion de Usuarios ---------------\n" +
            "1. Agregar usuario\n" +
            "2. Eliminar usuario\n" +
            "0. Volver\n" +
            "Seleccione una opción: "
        );
        return op !== null ? parseInt(op) : null;
    }


    mostrarMenuArticulos(rol, RolEnum) {
        let menu = "---------------Menu de Articulos----------------\n";
        menu += "1. Listar articulos\n";
        if (rol === RolEnum.Administrador || rol === RolEnum.TrabajadorDeposito) {
            menu += "2. Cargar articulo\n";
            menu += "4. Eliminar articulo\n";
        }
        if (rol === RolEnum.Administrador || rol === RolEnum.Vendedor || rol === RolEnum.TrabajadorDeposito) {
            menu += "3. Editar articulo\n";
        }
        if (rol === RolEnum.Administrador || rol === RolEnum.Vendedor || rol === RolEnum.Cliente) {
            menu += "5. Comprar articulo\n";
        }
        menu += "0. Volver al menu principal\n";
        menu += "Seleccione una opcion:";

        const op = this.getPromptInput(menu);
        return op !== null ? parseInt(op) : null;
    }


    getDatosNuevoUsuario() {
        const nombreDeUsuario = this.getPromptInput("Nombre de usuario:");
        if (nombreDeUsuario === null) return null;

        const contrasenia = this.getPromptInput("Contraseña:");
        if (contrasenia === null) return null;

        let rolSeleccionado;
        do {
            const input = this.getPromptInput(
                "Seleccione el rol del usuario:\n" +
                "(1) Administrador.\n" +
                "(2) Cliente.\n" +
                "(3) Vendedor.\n" +
                "(4) Trabajador de deposito."
            );
            if (input === null) return null;
            rolSeleccionado = parseInt(input);
            if (isNaN(rolSeleccionado) || rolSeleccionado < 1 || rolSeleccionado > 4) {
                this.showAlert("Opción inválida. Intente nuevamente.");
            }
        } while (isNaN(rolSeleccionado) || rolSeleccionado < 1 || rolSeleccionado > 4);

        return { nombreDeUsuario, contrasenia, rolSeleccionado };
    }


    getUsuarioAEliminar() {
        return this.getPromptInput("Ingrese el nombre de usuario a eliminar:");
    }


    getNuevaContrasenia() {
        return this.getPromptInput("Ingrese la nueva contraseña:");
    }


    getArticuloID() {
        const id = this.getPromptInput("Ingrese ID del articulo:");
        return id !== null ? parseInt(id) : null;
    }


    getDatosNuevoArticulo() {
        const nombre = this.getPromptInput("Nombre:");
        if (nombre === null) return null;
        const precioStr = this.getPromptInput("Precio:");
        if (precioStr === null) return null;
        const stockStr = this.getPromptInput("Stock:");
        if (stockStr === null) return null;

        const precio = parseFloat(precioStr);
        const stock = parseInt(stockStr);

        if (isNaN(precio) || isNaN(stock)) {
            this.showAlert("Entrada inválida para precio o stock. Deben ser números.");
            return null;
        }

        return { nombre, precio, stock };
    }


    getDatosEditarArticulo(articuloActual) {
        const nuevoNombre = this.getPromptInput(`Nuevo nombre (actual: ${articuloActual.nombre}):`, articuloActual.nombre);
        if (nuevoNombre === null) return null;
        const nuevoPrecioStr = this.getPromptInput(`Nuevo precio (actual: $${articuloActual.precio}):`, articuloActual.precio.toString());
        if (nuevoPrecioStr === null) return null;
        const nuevoStockStr = this.getPromptInput(`Nuevo stock (actual: ${articuloActual.stock}):`, articuloActual.stock.toString());
        if (nuevoStockStr === null) return null;

        const nuevoPrecio = parseFloat(nuevoPrecioStr);
        const nuevoStock = parseInt(nuevoStockStr);

        if (isNaN(nuevoPrecio) || isNaN(nuevoStock)) {
            this.showAlert("Entrada inválida para precio o stock. Deben ser números.");
            return null;
        }

        return { nuevoNombre, nuevoPrecio, nuevoStock };
    }


    getCantidadAComprar(articulo) {
        const cantidadStr = this.getPromptInput(`Artículo: ${articulo.nombre} | Stock disponible: ${articulo.stock}\n¿Cuántas unidades desea comprar?`);
        return cantidadStr !== null ? parseInt(cantidadStr) : null;
    }
}