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