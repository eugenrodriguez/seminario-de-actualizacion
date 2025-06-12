
export const Rol = {
    Administrador: 0,
    Cliente: 1,
    Vendedor: 2,
    TrabajadorDeposito: 3
};


export class AppModel {
    constructor() {

        this.articulos = new Map([
            [1, { nombre: "Lavandina x 1l", precio: 875.25, stock: 3000 }],
            [4, { nombre: "Detergente x 500l", precio: 1102.45, stock: 2010 }],
            [22, { nombre: "Jabon en polvo x 250g", precio: 650.22, stock: 407 }]
        ]);

        this.usuarios = new Map([
            ["juan", { nombreDeUsuario: "juan", contrasenia: "123456", rol: Rol.Administrador }],
            ["pedro", { nombreDeUsuario: "pedro", contrasenia: "12345", rol: Rol.Cliente }],
            ["carlos", { nombreDeUsuario: "carlos", contrasenia: "1234", rol: Rol.Vendedor }],
            ["franco", { nombreDeUsuario: "franco", contrasenia: "fran123", rol: Rol.TrabajadorDeposito }]
        ]);
    }

    corroborarCredenciales(usuario, contrasenia) {
        const user = this.usuarios.get(usuario);
        return user && user.contrasenia === contrasenia;
    }


    getRolUsuario(usuario) {
        const user = this.usuarios.get(usuario);
        return user ? user.rol : undefined;
    }


    isContraseniaSegura(contrasenia) {
        if (contrasenia.length < 8 || contrasenia.length > 16) {
            return false;
        }

        let tieneMayuscula = false;
        let simbolosEspeciales = 0;

        for (const char of contrasenia) {
            if (char === char.toUpperCase() && char !== char.toLowerCase()) {
                tieneMayuscula = true;
            }

            if (!/[a-zA-Z0-9]/.test(char)) {
                simbolosEspeciales++;
            }
        }

        return tieneMayuscula && simbolosEspeciales >= 2;
    }


    cambiarContrasenia(usuario, nuevaContrasenia) {
        if (this.isContraseniaSegura(nuevaContrasenia)) {
            const user = this.usuarios.get(usuario);
            if (user) {
                user.contrasenia = nuevaContrasenia;
                return true;
            }
        }
        return false;
    }


    registrarUsuario(nombreDeUsuario, contrasenia, rol) {
        if (this.usuarios.has(nombreDeUsuario)) {
            return false; 
        }
        if (!this.isContraseniaSegura(contrasenia)) {
            return false; 
        }
        this.usuarios.set(nombreDeUsuario, { nombreDeUsuario, contrasenia, rol });
        return true;
    }


    eliminarUsuario(usuarioAEliminar) {
        return this.usuarios.delete(usuarioAEliminar);
    }


    getListaArticulos() {
        let lista = "---------------Listado de Articulos----------------\n";
        if (this.articulos.size === 0) {
            lista += "No hay artículos disponibles.\n";
        } else {
            for (const [id, articulo] of this.articulos) {
                lista += `ID: ${id} | Nombre: ${articulo.nombre} | Precio: $${articulo.precio} | Stock: ${articulo.stock}\n`;
            }
        }
        return lista;
    }


    cargarArticulo(id, nombre, precio, stock) {
        if (this.articulos.has(id)) {
            return false; 
        }
        this.articulos.set(id, { nombre, precio, stock });
        return true;
    }


    editarArticulo(id, nuevoNombre, nuevoPrecio, nuevoStock) {
        const articulo = this.articulos.get(id);
        if (!articulo) {
            return false; 
        }
        articulo.nombre = nuevoNombre;
        articulo.precio = nuevoPrecio;
        articulo.stock = nuevoStock;
        return true;
    }


    eliminarArticulo(id) {
        return this.articulos.delete(id);
    }


    comprarArticulo(id, cantidad) {
        const articulo = this.articulos.get(id);
        if (!articulo) {
            return { success: false, message: "No se encontró ningún artículo con ese ID." };
        }

        if (cantidad <= 0) {
            return { success: false, message: "La cantidad debe ser mayor que cero." };
        } else if (cantidad > articulo.stock) {
            return { success: false, message: `Error: No hay suficiente stock disponible. Stock actual: ${articulo.stock}` };
        } else {
            articulo.stock -= cantidad;
            return { success: true, message: "Compra realizada con éxito." };
        }
    }


    getArticulo(id) {
        return this.articulos.get(id);
    }


    existeUsuario(usuario) {
        return this.usuarios.has(usuario);
    }
}