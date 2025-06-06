#include <iostream>
#include <string>
#include <map>

using namespace std;

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
void menuDeArticulos();

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

map<string, string> usuarios = {
    {"juan", "123456"},
    {"Pedro", "123456"},
    {"Carlos", "1234"}
};
    

bool corroborar(const string &usuario, const string &contrasenia)
{
    map<string, string>::iterator i = usuarios.find(usuario);

    if (i != usuarios.end() && i->second == contrasenia)
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
    
            // No es letra ni número → es un símbolo
            if (!isalnum(c))
                simbolosEspeciales++;
        }
    
        return tieneMayuscula && simbolosEspeciales >= 2;
    }
}

void cambiarContrasenia(string usuario, map<string, string> &usuarios)
{
    string nuevaContrasenia;

    do
    {
        cout << "Ingrese la nueva contraseña: ";
        cin >> nuevaContrasenia;

        if (contraseniaSegura(nuevaContrasenia))
        {
            usuarios[usuario] = nuevaContrasenia;
            cout << "Contraseña cambiada con éxito." << endl;
            break;
        }
        else
        {
            cout << "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales." << endl;
        }
    } while (true);
}

void menuUsuarioAutenticado(string usuario, map<string, string> &usuarios)
{
    int op;
    do
    {
        cout << "MENU DE USUARIO" << endl;
        cout << "1. Cambiar contraseña" << endl;
        cout << "2. Gestion de articulos" << endl;
        cout << "3. Salir" << endl;
        cout << "Seleccione una opción: ";
        cin >> op;
        switch (op)
        {
        case 1: cambiarContrasenia(usuario, usuarios);
            break;
        case 2: menuDeArticulos();
            break;
        case 3:
            cout << "Saliendo al inicio del sistema..." << endl;
            menuDeInicio();
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

    if(contraseniaSegura(contrasenia))
    {
        usuarios[usuario] = contrasenia;
        cout << "Usuario registrado con éxito." << endl;
        menuUsuarioAutenticado(usuario, usuarios);
    }
    else
    {
        cout << "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula y al menos 2 símbolos especiales." << endl;
        registrarUsuario();
    }
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
    cout << "Articulo agregado correctamente";

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

    cout << "Articulo editado correctamente";
    
}

void eliminarArticulo(){
    int id;
    cout << "Ingrese el ID del articulo a eliminar: ";
    cin >> id;

    if (articulos.erase(id)){
        cout << "Articulo eliminado con exito.";
    }
    else{
        cout << "No se encontro ningun articulo con ese ID";
    }
}


void menuDeArticulos(){

    do
    {
        int op;
        cout << "---------------Menu de Articulos----------------" << endl;
        cout << "1. Listar articulos" << endl;
        cout << "2. Cargar articulo" << endl;
        cout << "3. Editar articulo" << endl;
        cout << "4. Eliminar articulo" << endl;
        cout << "5. Volver al menu principal" << endl;
        cout << "Seleccione una opcion: ";
        cin >> op;

        switch (op){
            case 1: listarArticulos();
            break;
            case 2: cargarArticulo();
            break;
            case 3: editarArticulo();
            break;
            case 4: eliminarArticulo();
            break;
            case 5: return;
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
    cout << "2. Crear cuenta de usuario" << endl;
    cout << "Seleccione una opcion: ";
    cin >> op;
    switch(op)
    {
        case 1: login();
        break;
        case 2: registrarUsuario();
        break;
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
