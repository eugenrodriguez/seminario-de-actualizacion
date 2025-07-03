const Rol = {
    Administrador: 0,
    Cliente: 1,
    Vendedor: 2,
    TrabajadorDeposito: 3
};

class Model {
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

    getRol(usuario) {
        return this.usuarios.get(usuario)?.rol;
    }

    corroborar(usuario, contrasenia) {
        const user = this.usuarios.get(usuario);
        return user && user.contrasenia === contrasenia;
    }

    contraseniaSegura(contrasenia) {
        if (contrasenia.length < 8 || contrasenia.length > 16) return false;
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

    cambiarContrasenia(usuario, nueva) {
        this.usuarios.get(usuario).contrasenia = nueva;
    }

    registrarUsuario(usuario, contrasenia, rol) {
        this.usuarios.set(usuario, {
            nombreDeUsuario: usuario,
            contrasenia: contrasenia,
            rol: rol
        });
    }

    eliminarUsuario(usuario) {
        return this.usuarios.delete(usuario);
    }

    listarArticulos() {
        return Array.from(this.articulos.entries());
    }

    cargarArticulo(id, nombre, precio, stock) {
        if (this.articulos.has(id)) return false;
        this.articulos.set(id, { nombre, precio, stock });
        return true;
    }

    editarArticulo(id, nombre, precio, stock) {
        const articulo = this.articulos.get(id);
        if (!articulo) return false;
        articulo.nombre = nombre;
        articulo.precio = precio;
        articulo.stock = stock;
        return true;
    }

    eliminarArticulo(id) {
        return this.articulos.delete(id);
    }

    comprarArticulo(id, cantidad) {
        const articulo = this.articulos.get(id);
        if (!articulo || cantidad > articulo.stock || cantidad <= 0) return false;
        articulo.stock -= cantidad;
        return true;
    }
}

export { Model, Rol };