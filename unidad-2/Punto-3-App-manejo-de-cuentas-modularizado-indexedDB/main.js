import { App } from './app.js';
import { Model } from './model.js';

async function main() {
    const model = new Model();
    await model.init(); 
    const app = new App(model);
    app.run();
}

window.onload = main;

