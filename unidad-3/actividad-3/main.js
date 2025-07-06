import { CustomPricing } from './CustomPricing.js';

function main() {
    const pricingComponent = new CustomPricing();

    pricingComponent.data = [
        {
            title: 'Basic',
            highlightColor: 'w3-black',
            price: 10,
            buttonText: 'Sign Up',
            features: [
                { amount: '10GB', name: 'Storage' },
                { amount: '10', name: 'Emails' },
                { amount: '10', name: 'Domains' },
                { amount: 'Endless', name: 'Support' }
            ]
        },
        {
            title: 'Pro',
            highlightColor: 'w3-green',
            price: 25,
            buttonText: 'Sign Up',
            features: [
                { amount: '25GB', name: 'Storage' },
                { amount: '25', name: 'Emails' },
                { amount: '25', name: 'Domains' },
                { amount: 'Endless', name: 'Support' }
            ]
        },
        {
            title: 'Premium',
            highlightColor: 'w3-black',
            price: 50,
            buttonText: 'Sign Up',
            features: [
                { amount: '50GB', name: 'Storage' },
                { amount: '50', name: 'Emails' },
                { amount: '50', name: 'Domains' },
                { amount: 'Endless', name: 'Support' }
            ]
        }
    ];

    document.body.appendChild(pricingComponent);
}

window.onload = main;
