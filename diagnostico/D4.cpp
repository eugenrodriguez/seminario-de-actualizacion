#include <iostream>
#include <string>
#include <map>

using namespace std;

map<string, string> usuarios = {
    {"juan", "123456"},
    {"Pedro", "123456"},
    {"Carlos", "1234"}};

bool corroborar(const string &usuario, const string &contrasenia);
bool contraseniaSegura(const string &contrasenia);
void cambiarContrasenia(string usuario, map<string, string> &usuarios);
void menuUsuarioAutenticado(string usuario, map<string, string> &usuarios);
void login();
void registrarUsuario();
void menuDeInicio();
    

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
    char op;
    do
    {
        cout << "\nMENU DE USUARIO" << endl;
        cout << "1. Cambiar contraseña" << endl;
        cout << "X. Salir" << endl;
        cout << "Seleccione una opción: ";
        cin >> op;
        switch (op)
        {
        case '1':
            cambiarContrasenia(usuario, usuarios);
            break;
        case 'x':
            cout << "Saliendo al inicio del sistema..." << endl;
            return;
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
