class CustomCalculator extends HTMLElement
    {
        constructor()
        {
            super();
            
            this.shadow = this.attachShadow({ mode: 'open' });

            const link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', 'styles.css');
            this.shadow.appendChild(link);

            this.contenedor = document.createElement('div');
            this.contenedor.classList.add('contenedor-calculadora'); 


            this.display = document.createElement('input');
            this.display.type = 'text'; //Es como hacer <input type="text">
            this.display.readOnly = true;
            this.display.classList.add('visor-numeros');
            this.display.style.gridColumn = 'span 4';


            this.btn7 = document.createElement('button');
            this.btn7.innerText = '7';
            this.btn7.classList.add('boton', 'azul');

            this.btn8 = document.createElement('button');
            this.btn8.innerText = '8';
            this.btn8.classList.add('boton', 'azul');

            this.btn9 = document.createElement('button');
            this.btn9.innerText = '9';
            this.btn9.classList.add('boton', 'azul');

            this.btnPlus = document.createElement('button');
            this.btnPlus.innerText = '+';
            this.btnPlus.classList.add('boton', 'verde');

            this.btn4 = document.createElement('button');
            this.btn4.innerText = '4';
            this.btn4.classList.add('boton', 'azul');

            this.btn5 = document.createElement('button');
            this.btn5.innerText = '5';
            this.btn5.classList.add('boton', 'azul');

            this.btn6 = document.createElement('button');
            this.btn6.innerText = '6';
            this.btn6.classList.add('boton', 'azul');

            this.btnMinus = document.createElement('button');
            this.btnMinus.innerText = '-';
            this.btnMinus.classList.add('boton', 'verde');

            this.btn3 = document.createElement('button');
            this.btn3.innerText = '3';
            this.btn3.classList.add('boton', 'azul');

            this.btn2 = document.createElement('button');
            this.btn2.innerText = '2';
            this.btn2.classList.add('boton', 'azul');

            this.btn1 = document.createElement('button');
            this.btn1.innerText = '1';
            this.btn1.classList.add('boton', 'azul');

            this.btnMultiply = document.createElement('button');
            this.btnMultiply.innerText = '*';
            this.btnMultiply.classList.add('boton', 'verde');

            this.btn0 = document.createElement('button');
            this.btn0.innerText = '0';
            this.btn0.classList.add('boton', 'azul');

            this.btnDot = document.createElement('button');
            this.btnDot.innerText = '.';
            this.btnDot.classList.add('boton', 'azul');

            this.btnCalculate = document.createElement('button');
            this.btnCalculate.innerText = '=';
            this.btnCalculate.classList.add('boton', 'amarillo');

            this.btnDivide = document.createElement('button');
            this.btnDivide.innerText = '/';
            this.btnDivide.classList.add('boton', 'verde');

            this.btnClear = document.createElement('button');
            this.btnClear.innerText = 'Borrar';
            this.btnClear.classList.add('boton', 'borrar');
            this.btnClear.style.gridColumn = 'span 4';
            


        }        
        
        onButton0Click(event) 
        { 
            this.display.value += '0'; 
        }

        onButton1Click(event) 
        { 
            this.display.value += '1'; 
        }

        onButton2Click(event) 
        { 
            this.display.value += '2'; 
        }

        onButton3Click(event) 
        { 
            this.display.value += '3'; 
        }

        onButton4Click(event) 
        { 
            this.display.value += '4'; 
        }

        onButton5Click(event) 
        { 
            this.display.value += '5'; 
        }

        onButton6Click(event) 
        { 
            this.display.value += '6'; 
        }

        onButton7Click(event) 
        { 
            this.display.value += '7'; 
        }

        onButton8Click(event) 
        { 
            this.display.value += '8'; 
        }

        onButton9Click(event) 
        {
            this.display.value += '9'; 
        }

        onButtonPlusClick(event)     
        { 
            this.display.value += '+'; 
        }

        onButtonMinusClick(event)    
        { 
            this.display.value += '-'; 
        }

        onButtonMultiplyClick(event) 
        { 
            this.display.value += '*'; 
        }

        onButtonDivideClick(event)   
        { 
            this.display.value += '/'; 
        }

        onButtonDotClick(event)      
        { 
            this.display.value += '.'; 
        }

        onButtonCalculateClick(event)
        {
            this.display.value = eval(this.display.value);
        }

        onButtonClearClick(event) {
            this.display.value = '';
        }

        //metodos que se implementan si o si al realizar web components completos
        connectedCallback()
        {
            //Se va a ejecutar siempre cuando el elemento es insertado en el DOM
            //DOM = Arbol de elementos HTML. Es decir,  es el decumento de elementos HTML escrito como instancias de javascript. Ese arbol funciona internamente en paralelo al codigo html(ese arbol javascript serializado en formato texto)
            this.shadow.appendChild(this.contenedor);
            this.contenedor.appendChild(this.display);

            this.contenedor.appendChild(this.btn7);
            this.contenedor.appendChild(this.btn8);
            this.contenedor.appendChild(this.btn9);
            this.contenedor.appendChild(this.btnPlus);

            this.contenedor.appendChild(this.btn4);
            this.contenedor.appendChild(this.btn5);
            this.contenedor.appendChild(this.btn6);
            this.contenedor.appendChild(this.btnMinus);

            this.contenedor.appendChild(this.btn1);
            this.contenedor.appendChild(this.btn2);
            this.contenedor.appendChild(this.btn3);
            this.contenedor.appendChild(this.btnMultiply);

            this.contenedor.appendChild(this.btn0);
            this.contenedor.appendChild(this.btnDot);
            this.contenedor.appendChild(this.btnCalculate);
            this.contenedor.appendChild(this.btnDivide);

            this.contenedor.appendChild(this.btnClear);

            this.btn0.onclick = this.onButton0Click.bind(this);
            this.btn1.onclick = this.onButton1Click.bind(this);
            this.btn2.onclick = this.onButton2Click.bind(this);
            this.btn3.onclick = this.onButton3Click.bind(this);
            this.btn4.onclick = this.onButton4Click.bind(this);
            this.btn5.onclick = this.onButton5Click.bind(this);
            this.btn6.onclick = this.onButton6Click.bind(this);
            this.btn7.onclick = this.onButton7Click.bind(this);
            this.btn8.onclick = this.onButton8Click.bind(this);
            this.btn9.onclick = this.onButton9Click.bind(this);

            this.btnPlus.onclick = this.onButtonPlusClick.bind(this);
            this.btnMinus.onclick = this.onButtonMinusClick.bind(this);
            this.btnMultiply.onclick = this.onButtonMultiplyClick.bind(this);
            this.btnDivide.onclick = this.onButtonDivideClick.bind(this);
            this.btnDot.onclick = this.onButtonDotClick.bind(this);

            this.btnCalculate.onclick = this.onButtonCalculateClick.bind(this);
            this.btnClear.onclick = this.onButtonClearClick.bind(this);


        }

        disconnectedCallback()                           
        {
            //Se va a ejecutar siempre que se quite el elemento del documento.
        }

        adoptedCallback()
        {
            //Se va a ejecutar siempre que el elemento se cambie de documento
        }

        connectedMoveCallback()
        {
            //Se ejecuta cuando se mueve el elemento dentro del DOM
        }

        static get observableAttributes()
        {
            //Solo para publicar cuales son los atributos que tendria el Web Component si es utilizado a traves de codigo HTML
            //Ejemplo: <mi-elemento sabor="acido">

            //return ['sabor']
        }

        attributeChangedCallback(attr, newvalue, oldvalue)
        {
            //Manejador de cambios de los valores de los atributos personalizados
        }

        /////////////////////////////////////////////////
        
    }

    customElements.define('x-calculator', CustomCalculator);

    export {CustomCalculator};

