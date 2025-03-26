#include <iostream>
#include <string>
#include <map>

using namespace std;

map<string, string> usuarios = {
    {"juan", "123456"},
    {"Pedro", "123456"},
    {"Carlos", "1234"}};

bool corroborar(const string &usuario, const string &contrasenia)
{
    map<string, string>::iterator i = usuarios.find(usuario);

    if (i != usuarios.end() && i->second == contrasenia)
    {
        return true;
    }
    return false;
}

void cambiarContrasenia(string usuario, map<string, string> &usuarios)
{
    string nuevaContrasenia;

    cout << "Ingrese la nueva contrasenia: ";
    cin >> nuevaContrasenia;
    usuarios[usuario] = nuevaContrasenia;
    cout << "Contrasenia cambiada con exito." << endl;
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

int main()
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

            return 0;
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

    return 0;
}
