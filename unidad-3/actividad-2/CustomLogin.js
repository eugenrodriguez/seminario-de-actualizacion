class CustomLogin extends HTMLElement
{
    constructor()
    {
        super();

        this.header = document.createElement('header');
        this.header.classList.add('w3-container', 'w3-teal');

        this.headerTitle = document.createElement('h1');
        this.headerTitle.textContent = 'Login Example';

        this.container = document.createElement('div');
        this.container.classList.add('w3-container', 'w3-half', 'w3-margin-top');

        this.form = document.createElement('form');
        this.form.classList.add('w3-container', 'w3-card-4');

        this.nameField = document.createElement('p');
        this.inputName = document.createElement('input');
        this.inputName.classList.add('w3-input');
        this.inputName.setAttribute('type', 'text');
        this.inputName.setAttribute('style', 'width:90%');
        this.inputName.required = true;

        this.labelName = document.createElement('label');
        this.labelName.textContent = 'Name';

        this.passwordField = document.createElement('p');
        this.inputPassword = document.createElement('input');
        this.inputPassword.classList.add('w3-input');
        this.inputPassword.setAttribute('type', 'password');
        this.inputPassword.setAttribute('style', 'width:90%');
        this.inputPassword.required = true;

        this.labelPassword = document.createElement('label');
        this.labelPassword.textContent = 'Password';

        this.radioMaleField = document.createElement('p');
        this.radioMale = document.createElement('input');
        this.radioMale.classList.add('w3-radio');
        this.radioMale.setAttribute('type', 'radio');
        this.radioMale.setAttribute('name', 'gender');
        this.radioMale.setAttribute('value', 'male');
        this.radioMale.checked = true;

        this.labelMale = document.createElement('label');
        this.labelMale.textContent = 'Male';

        this.radioFemaleField = document.createElement('p');
        this.radioFemale = document.createElement('input');
        this.radioFemale.classList.add('w3-radio');
        this.radioFemale.setAttribute('type', 'radio');
        this.radioFemale.setAttribute('name', 'gender');
        this.radioFemale.setAttribute('value', 'female');

        this.labelFemale = document.createElement('label');
        this.labelFemale.textContent = 'Female';

        this.radioDisabledField = document.createElement('p');
        this.radioDisabled = document.createElement('input');
        this.radioDisabled.classList.add('w3-radio');
        this.radioDisabled.setAttribute('type', 'radio');
        this.radioDisabled.setAttribute('name', 'gender');
        this.radioDisabled.disabled = true;

        this.labelDisabled = document.createElement('label');
        this.labelDisabled.textContent = "Don't know (Disabled)";

        this.checkboxField = document.createElement('p');
        this.checkbox = document.createElement('input');
        this.checkbox.classList.add('w3-check');
        this.checkbox.setAttribute('type', 'checkbox');
        this.checkbox.checked = true;

        this.labelCheckbox = document.createElement('label');
        this.labelCheckbox.textContent = 'Stay logged in';

        this.buttonField = document.createElement('p');
        this.loginButton = document.createElement('button');
        this.loginButton.classList.add('w3-button', 'w3-section', 'w3-teal', 'w3-ripple');
        this.loginButton.textContent = 'Log in';




        


    }        
        connectedCallback()
        {
            this.header.appendChild(this.headerTitle);
            this.appendChild(this.header);

            this.nameField.appendChild(this.inputName);
            this.nameField.appendChild(this.labelName);

            this.passwordField.appendChild(this.inputPassword);
            this.passwordField.appendChild(this.labelPassword);

            this.radioMaleField.appendChild(this.radioMale);
            this.radioMaleField.appendChild(this.labelMale);

            this.radioFemaleField.appendChild(this.radioFemale);
            this.radioFemaleField.appendChild(this.labelFemale);

            this.radioDisabledField.appendChild(this.radioDisabled);
            this.radioDisabledField.appendChild(this.labelDisabled);

            this.checkboxField.appendChild(this.checkbox);
            this.checkboxField.appendChild(this.labelCheckbox);

            this.buttonField.appendChild(this.loginButton);

            this.form.appendChild(this.nameField);
            this.form.appendChild(this.passwordField);
            this.form.appendChild(this.radioMaleField);
            this.form.appendChild(this.radioFemaleField);
            this.form.appendChild(this.radioDisabledField);
            this.form.appendChild(this.checkboxField);
            this.form.appendChild(this.buttonField);

            this.container.appendChild(this.form);
            this.appendChild(this.container);


        }

        disconnectedCallback()                           
        {
        }

        adoptedCallback()
        {
        }

        connectedMoveCallback()
        {
        }

        static get observableAttributes()
        {
        }

        attributeChangedCallback(attr, newvalue, oldvalue)
        {
        }

        
        
    }

    customElements.define('x-login', CustomLogin);

    export {CustomLogin};

