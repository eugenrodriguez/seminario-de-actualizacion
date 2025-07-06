class CustomPricing extends HTMLElement
{
    constructor()
    {
        super();

        this.container = document.createElement('div');
        this.container.classList.add('w3-container');

        this.mainTitle = document.createElement('h2');
        this.mainTitle.textContent = 'Responsive Pricing Tables';

        this.row = document.createElement('div');
        this.row.classList.add('w3-row-padding');

        this._plans = [];

    }

    set data(plans) {
        this._plans = plans;
    }

    connectedCallback() 
    {
        this.container.appendChild(this.mainTitle);
        this.appendChild(this.container);

        this._plans.forEach(plan => {
            const column = document.createElement('div');
            column.classList.add('w3-third', 'w3-margin-bottom');

            const list = document.createElement('ul');
            list.classList.add('w3-ul', 'w3-border', 'w3-center', 'w3-hover-shadow');

            const headerItem = document.createElement('li');
            headerItem.classList.add(plan.highlightColor || 'w3-black', 'w3-xlarge', 'w3-padding-32');
            headerItem.textContent = plan.title;
            list.appendChild(headerItem);

            plan.features.forEach(feature => {
                const li = document.createElement('li');
                li.classList.add('w3-padding-16');

                const bold = document.createElement('b');
                bold.textContent = feature.amount;

                li.appendChild(bold);
                li.appendChild(document.createTextNode(` ${feature.name}`));

                list.appendChild(li);
            });

            const priceItem = document.createElement('li');
            priceItem.classList.add('w3-padding-16');

            const priceText = document.createElement('h2');
            priceText.classList.add('w3-wide');
            priceText.textContent = `$ ${plan.price}`;

            const span = document.createElement('span');
            span.classList.add('w3-opacity');
            span.textContent = 'per month';

            priceItem.appendChild(priceText);
            priceItem.appendChild(span);
            list.appendChild(priceItem);

            const buttonItem = document.createElement('li');
            buttonItem.classList.add('w3-light-grey', 'w3-padding-24');

            const button = document.createElement('button');
            button.classList.add('w3-button', 'w3-green', 'w3-padding-large');
            button.textContent = plan.buttonText || 'Sign Up';

            buttonItem.appendChild(button);
            list.appendChild(buttonItem);

            column.appendChild(list);
            this.row.appendChild(column);
        });
        
        this.appendChild(this.row);

    }
}

customElements.define('x-pricing', CustomPricing);
export { CustomPricing };