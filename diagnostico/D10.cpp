#include <iostream>
#include <string>
#include <fstream>
#include <sstream>

#include <map>

using namespace std;

enum Rol {
    Administrador,
    Cliente,
    Vendedor,
    TrabajadorDeposito
};

bool corroborar(const string &usuario, const string &contrasenia);
bool contraseniaSegura(const string &contrasenia);
void cambiarContrasenia(string usuario, map<string, string> &usuarios);
void menuUsuarioAutenticado(string usuario, map<string, string> &usuarios);
void login();
void registrarUsuario();
void menuDeInicio();
void listarArticulos();
void cargarArticulo();
void editarArticulo();
void eliminarArticulo();
void comprarArticulo();
void menuDeArticulos(string usuario);

struct Articulo {
    string nombre;
    double precio;
    int stock;
};

map<int, Articulo> articulos ={
    {1, {"Lavandina x 1l", 875.25, 3000}},
    {4, {"Detergente x 500l", 1102.45, 2010}},
    {22, {"Jabon en polvo x 250g", 650.22, 407}}
};

struct Usuario {
    string nombreDeUsuario;
    string contrasenia;
    Rol rol;
};

map<string, Usuario> usuarios = {
    {"juan", {"juan", "123456", Administrador}},
    {"pedro", {"pedro", "12345", Cliente}},
    {"carlos", {"carlos", "1234", Vendedor}},
    {"franco", {"franco", "fran123", TrabajadorDeposito}}
};
    

bool corroborar(const string &usuario, const string &contrasenia)
{
    map<string, Usuario>::iterator i = usuarios.find(usuario);

    if (i != usuarios.end() && i->second.contrasenia == contrasenia)
    {
        return true;
    }
    return false;
}

bool contraseniaSegura(const string &contrasenia)
{
    {
        if (contrasenia.length() < 8 || contrasenia.length() > 16)
            return false;
    
        bool tieneMayuscula = false;
        int simbolosEspeciales = 0;
    
        for (char c : contrasenia)
        {
            if (isupper(c))
                tieneMayuscula = true;
    
            if (!isalnum(c))
                simbolosEspeciales++;
        }
    
        return tieneMayuscula && simbolosEspeciales >= 2;
    }
}

void cambiarContrasenia(string usuario, map<string, Usuario> &usuarios)
{
    string nuevaContrasenia;

    do
    {
        cout << "Ingrese la nueva contraseña: ";
        cin >> nuevaContrasenia;

        if (contraseniaSegura(nuevaContrasenia))
        {
            usuarios[usuario].contrasenia = nuevaContrasenia;
            cout << "Contraseña cambiada con éxito." << endl;
            break;
        }
        else
        {
            cout << "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales." << endl;
        }
    } while (true);
}

void menuUsuarioAutenticado(string usuario, map<string, Usuario> &usuarios)
{
    Rol rol = usuarios[usuario].rol;
    int op;
    do
    {
        cout << "MENU DE USUARIO" << endl;
        cout << "1. Cambiar contraseña" << endl;
        cout << "2. Gestion de articulos" << endl;
        if (rol == Administrador) {
            cout << "3. Gestion de usuarios" << endl; // SOLO para administradores
        }
        cout << "0. Salir" << endl;
        cout << "Seleccione una opción: ";
        cin >> op;
        switch (op)
        {
        case 1: cambiarContrasenia(usuario, usuarios);
            break;
        case 2: menuDeArticulos(usuario);
            break;
        case 3: 
            if (rol == Administrador) {
                registrarUsuario(); 
            } else {
                cout << "Acceso denegado. Solo administradores pueden gestionar usuarios." << endl;
            }
            break;
        case 0:
            cout << "Saliendo al inicio del sistema..." << endl;
            menuDeInicio();
            break;
        default:
            cout << "Opción no válida. Intente nuevamente." << endl;
        }
    } while (true);
}

void login()
{
    string usuario, contrasenia;
    int intentos = 0;
    const int max_intentos = 3;

    while (intentos < max_intentos)
    {
        cout << "Usuario: ";
        cin >> usuario;
        cout << "Contraseña: ";
        cin >> contrasenia;

        if (corroborar(usuario, contrasenia))
        {
            cout << "¡Bienvenido/a " << usuario << "!" << endl;
            menuUsuarioAutenticado(usuario, usuarios);
        }
        else
        {
            intentos++;
            cout << "Usuario y/o contraseña incorrecta." << endl;
        }

        if (intentos == max_intentos)
        {
            cout << "Usuario bloqueado. Contacte al administrador." << endl;
        }
    }
}

void registrarUsuario()
{
    string nombre, apellido, email, usuario, contrasenia;
    int rolSeleccionado;
    cout << "Nombre: ";
    cin >> nombre;
    cout << "Apellido: ";
    cin >> apellido;
    cout << "Correo Electronico: ";
    cin >> email;
    cout << "Nombre de usuario: ";
    cin >> usuario;
    cout << "Contrasenia: ";
    cin >> contrasenia;
    if(!contraseniaSegura(contrasenia))
    {
        do{
            cout << "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales. Intente nuevamente: ";
            cin >> contrasenia;
        }while (!contraseniaSegura(contrasenia));
    }
    cout << "Seleccione el rol del usuario: " << endl;
    cout << "(1) Administrador." << endl;
    cout << "(2) Cliente." << endl;
    cout << "(3) Vendedor." << endl;
    cout << "(4) Trabajador de deposito." << endl;
    cin >> rolSeleccionado;

    Rol rol;
    switch(rolSeleccionado)
    {
        case 1: rol = Administrador;
        break;
        case 2: rol = Cliente;
        break;
        case 3: rol = Vendedor;
        break;
        case 4: rol = TrabajadorDeposito;
        break;
        default: cout << "Opcion invalida. ";
        return;
    }

    usuarios[usuario] = {usuario, contrasenia, rol};
    cout << "Usuario registrado con éxito." << endl;
}

void listarArticulos(){
    cout << "---------------Listado de Articulos----------------" << endl;
    for (auto const &par : articulos) {
        cout << "ID: " << par.first
             << " | Nombre: " << par.second.nombre
             << " | Precio: $" << par.second.precio
             << " | Stock: " << par.second.stock << endl;
    }
}

void cargarArticulo(){
    int id;
    Articulo nuevoArticulo;
    cout << "Ingrese ID del nuevo articulo: ";
    cin >> id;

    if (articulos.find(id) != articulos.end()) {
        cout << "Ya existe un articulo con ese ID.";
        return;
    }

    cout << "Nombre: ";
    cin.ignore();
    getline(cin, nuevoArticulo.nombre);

    cout << "Precio: ";
    cin >> nuevoArticulo.precio;

    cout << "Stock: ";
    cin >> nuevoArticulo.stock;

    articulos[id] = nuevoArticulo;
    cout << "Articulo agregado correctamente" << endl;

}

void editarArticulo(){
    int id;
    cout << "Ingrese el ID del articulo que desea editar: ";
    cin >> id;

    auto it = articulos.find(id);
    if (it == articulos.end()) {
        cout << "No se encontró el artículo con ese ID";
        return;
    }

    cout << "Nuevo nombre (actual: "<< it->second.nombre << "): ";
    cin.ignore();
    getline(cin, it->second.nombre);

    cout << "Nuevo precio (actual: $" << it->second.precio << "): ";
    cin >> it->second.precio;

    cout << "Nuevo stock (actual: " << it->second.stock << "): ";
    cin >> it->second.stock;

    cout << "Articulo editado correctamente" << endl;
    
}

void eliminarArticulo(){
    int id;
    cout << "Ingrese el ID del articulo a eliminar: ";
    cin >> id;

    if (articulos.erase(id)){
        cout << "Articulo eliminado con exito." << endl;
    }
    else{
        cout << "No se encontro ningun articulo con ese ID";
    }
}

void comprarArticulo(){
    int id, cantidad;
    cout << "Ingrese el ID del articulo que desea comprar ";
    cin >> id;

    auto it = articulos.find(id);
    if(it == articulos.end()){
        cout << "No se encontro ningun articul con ese ID. " << endl;
        return;
    }

    cout << "Articulo: " << it->second.nombre << "| Stock disponible: " << it->second.stock << endl;
    cout << "Cuantas unidades desea comprar? ";
    cin >> cantidad;

    if (cantidad <=0){
        cout << "La cantidad debe ser mayor que cero. "<< endl;
        return;
    }else if (cantidad > it->second.stock) {
        cout << "Error: No hay suficiente stock disponible. " << endl;
        return;
    }
    else{
        it->second.stock -= cantidad;
        cout << "Compra realizada con exito. " << endl;
    }


}


void menuDeArticulos(string usuario){

    Rol rol = usuarios[usuario].rol;

    do
    {
        int op;
        cout << "---------------Menu de Articulos----------------" << endl;
        cout << "1. Listar articulos" << endl;
        if (rol == Administrador || rol == TrabajadorDeposito) {
            cout << "2. Cargar articulo" << endl;
            cout << "4. Eliminar articulo" << endl;
        }
        if (rol == Administrador || rol == Vendedor || rol == TrabajadorDeposito) {
            cout << "3. Editar articulo" << endl;
        }
        if (rol == Administrador || rol == Vendedor || rol == Cliente) {
            cout << "5. Comprar articulo" << endl;
        }
        cout << "0. Volver al menu principal" << endl;
        cout << "Seleccione una opcion: ";
        cin >> op;

        switch (op){
            case 1: listarArticulos();
            break;
            case 2: 
                if (rol == Administrador || rol == TrabajadorDeposito) {
                    cargarArticulo();
                } else {
                    cout << "Acción no permitida para su rol." << endl;
                }
                break;
            case 3: 
                if (rol == Administrador || rol == Vendedor || rol == TrabajadorDeposito) {
                    editarArticulo();
                } else {
                    cout << "Acción no permitida para su rol." << endl;
                }
                break;
            case 4: 
                if (rol == Administrador || rol == TrabajadorDeposito) {
                    eliminarArticulo();
                } else {
                    cout << "Acción no permitida para su rol." << endl;
                }
                break;
            case 5:
                if (rol == Administrador || rol == Vendedor || rol == Cliente) {
                    comprarArticulo();
                } else {
                    cout << "Acción no permitida para su rol." << endl;
                }
                break;
            case 0: return;
            default: cout << "Opcion invalida";
            break;
        }
    } while(true);
}

void menuDeInicio()
{
    int op;
    cout << "----------------Menu de inicio---------------" << endl;
    cout << "1. Iniciar sesion" << endl;
    cout << "0. Salir" << endl;
    cout << "Seleccione una opcion: ";
    cin >> op;
    switch(op)
    {
        case 1: login();
        break;
        case 0: cout << "Saliendo del sistema..." << endl;
        exit(0);
        default: cout << "Opcion invalida." << endl;
    }
}

int main()
{
    while(true)
    {
        menuDeInicio();
    }
    

    return 0;
}
