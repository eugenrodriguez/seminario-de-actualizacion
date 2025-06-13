

export class AppUI {
    constructor() {

    }


    showAlert(mensaje) {
        alert(mensaje);
    }


    showSuccessMessage(mensaje) {
        alert(`Éxito: ${mensaje}`);
    }


    showErrorMessage(mensaje) {
        alert(`Error: ${mensaje}`);
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


    showWelcomeMessage(usuario) {
        this.showAlert(`¡Bienvenido/a ${usuario}!`);
    }


    showLoginError() {
        this.showAlert("Usuario y/o contraseña incorrecta.");
    }


    showUserBlocked() {
        this.showAlert("Usuario bloqueado. Contacte al administrador.");
    }


    showExitingToStartMessage() {
        this.showAlert("Saliendo al inicio del sistema...");
    }


    showInvalidOption() {
        this.showAlert("Opción no válida. Intente nuevamente.");
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


    showAdminAccessDenied() {
        this.showAlert("Acceso denegado. Solo administradores pueden gestionar usuarios.");
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


    showPasswordRequirements() {
        this.showAlert("La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales.");
    }


    showPasswordChangeSuccess() {
        this.showAlert("Contraseña cambiada con éxito.");
    }


    showUserDeletedSuccess() {
        this.showAlert("Usuario eliminado con éxito.");
    }


    showUserNotFound() {
        this.showAlert("No se encontró el usuario.");
    }


    showUserRegisteredSuccess() {
        this.showAlert("Usuario registrado con éxito.");
    }


    showUsernameAlreadyExists() {
        this.showAlert("Ya existe un usuario con ese nombre. Intente con otro.");
    }


    showInvalidRoleSelection() {
        this.showAlert("Selección de rol inválida.");
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
                this.showInvalidOption(); 
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


    mostrarMenuArticulos(rol, RolEnum) {
        let menu = "---------------Menu de Articulos----------------\n";
        menu += "1. Listar articulos\n";
        if (rol === RolEnum.Administrador || rol === Rol.TrabajadorDeposito) {
            menu += "2. Cargar articulo\n";
            menu += "4. Eliminar articulo\n";
        }
        if (rol === RolEnum.Administrador || rol === Rol.Vendedor || rol === Rol.TrabajadorDeposito) {
            menu += "3. Editar articulo\n";
        }
        if (rol === RolEnum.Administrador || rol === Rol.Vendedor || rol === Rol.Cliente) {
            menu += "5. Comprar articulo\n";
        }
        menu += "0. Volver al menu principal\n";
        menu += "Seleccione una opcion:";

        const op = this.getPromptInput(menu);
        return op !== null ? parseInt(op) : null;
    }


    showArticulosList(lista) {
        this.showAlert(lista);
    }


    showActionNotAllowed() {
        this.showAlert("Acción no permitida para su rol.");
    }


    showInvalidID() {
        this.showAlert("ID inválido.");
    }


    showArticleAlreadyExists() {
        this.showAlert("Ya existe un artículo con ese ID.");
    }


    showArticleAddedSuccess() {
        this.showAlert("Artículo agregado correctamente.");
    }


    showArticleAddError() {
        this.showAlert("Error al cargar el artículo. Verifique los datos.");
    }


    showArticleNotFound() {
        this.showAlert("No se encontró el artículo con ese ID.");
    }


    showArticleEditedSuccess() {
        this.showAlert("Artículo editado correctamente.");
    }

    
    showArticleEditError() {
        this.showAlert("Error al editar el artículo.");
    }


    showArticleDeletedSuccess() {
        this.showAlert("Artículo eliminado con éxito.");
    }


    showPurchaseInvalidQuantity() {
        this.showAlert("La cantidad debe ser mayor que cero.");
    }


    showPurchaseInsufficientStock() {
        this.showAlert("Error: No hay suficiente stock disponible.");
    }


    showPurchaseSuccess() {
        this.showAlert("Compra realizada con éxito.");
    }


    showExitingSystemMessage() {
        this.showAlert("Saliendo del sistema...");
    }


    showRoleErrorMessage() {
        this.showErrorMessage("No se pudo obtener el rol del usuario.");
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
            this.showErrorMessage("Entrada inválida para precio o stock. Deben ser números.");
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
            this.showErrorMessage("Entrada inválida para precio o stock. Deben ser números.");
            return null;
        }

        return { nuevoNombre, nuevoPrecio, nuevoStock };
    }


    getCantidadAComprar(articulo) {
        const cantidadStr = this.getPromptInput(`Artículo: ${articulo.nombre} | Stock disponible: ${articulo.stock}\n¿Cuántas unidades desea comprar?`);
        return cantidadStr !== null ? parseInt(cantidadStr) : null;
    }
}
