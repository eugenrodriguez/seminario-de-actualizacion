import { IndexedDBHandler } from './indexedDBHandler.js';

const Rol = {
    Administrador: 0,
    Cliente: 1,
    Vendedor: 2,
    TrabajadorDeposito: 3
};

class Model {
    constructor() {
        this.db = new IndexedDBHandler();
        this.usuarios = new Map();
        this.articulos = new Map();
    }

    async init() {
        await this.db.init([
            { name: "usuarios", keyPath: "nombreDeUsuario" },
            { name: "articulos", keyPath: "id" }
        ]);
        await this.cargarDatos();
    }

    async cargarDatos() {
        const usuarios = await this.db.getAll("usuarios");
        const articulos = await this.db.getAll("articulos");

        if (usuarios.length === 0) {
            this.usuarios = new Map([
                ["juan", { nombreDeUsuario: "juan", contrasenia: "123456", rol: Rol.Administrador }],
                ["pedro", { nombreDeUsuario: "pedro", contrasenia: "12345", rol: Rol.Cliente }],
                ["carlos", { nombreDeUsuario: "carlos", contrasenia: "1234", rol: Rol.Vendedor }],
                ["franco", { nombreDeUsuario: "franco", contrasenia: "fran123", rol: Rol.TrabajadorDeposito }]
            ]);
            for (let usuario of this.usuarios.values()) {
                await this.db.put("usuarios", usuario);
            }
        } else {
            this.usuarios = new Map(usuarios.map(u => [u.nombreDeUsuario, u]));
        }

        if (articulos.length === 0) {
            this.articulos = new Map([
                [1, { id: 1, nombre: "Lavandina x 1l", precio: 875.25, stock: 3000 }],
                [4, { id: 4, nombre: "Detergente x 500l", precio: 1102.45, stock: 2010 }],
                [22, { id: 22, nombre: "Jabon en polvo x 250g", precio: 650.22, stock: 407 }]
            ]);
            for (let art of this.articulos.values()) {
                await this.db.put("articulos", art);
            }
        } else {
            this.articulos = new Map(articulos.map(a => [a.id, a]));
        }
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

    async cambiarContrasenia(usuario, nueva) {
        const user = this.usuarios.get(usuario);
        if (!user) return;
        user.contrasenia = nueva;
        await this.db.put("usuarios", user);
    }

    async registrarUsuario(usuario, contrasenia, rol) {
        const nuevo = { nombreDeUsuario: usuario, contrasenia, rol };
        this.usuarios.set(usuario, nuevo);
        await this.db.put("usuarios", nuevo);
    }

    async eliminarUsuario(usuario) {
        const eliminado = this.usuarios.delete(usuario);
        if (eliminado) {
            await this.db.delete("usuarios", usuario);
        }
        return eliminado;
    }

    listarArticulos() {
        return Array.from(this.articulos.entries());
    }

    async cargarArticulo(id, nombre, precio, stock) {
        if (this.articulos.has(id)) return false;
        const nuevo = { id, nombre, precio, stock };
        this.articulos.set(id, nuevo);
        await this.db.put("articulos", nuevo);
        return true;
    }

    async editarArticulo(id, nombre, precio, stock) {
        const articulo = this.articulos.get(id);
        if (!articulo) return false;
        articulo.nombre = nombre;
        articulo.precio = precio;
        articulo.stock = stock;
        await this.db.put("articulos", articulo);
        return true;
    }

    async eliminarArticulo(id) {
        const eliminado = this.articulos.delete(id);
        if (eliminado) {
            await this.db.delete("articulos", id);
        }
        return eliminado;
    }

    async comprarArticulo(id, cantidad) {
        const articulo = this.articulos.get(id);
        if (!articulo || cantidad > articulo.stock || cantidad <= 0) return false;
        articulo.stock -= cantidad;
        await this.db.put("articulos", articulo);
        return true;
    }
}

export { Model, Rol };
