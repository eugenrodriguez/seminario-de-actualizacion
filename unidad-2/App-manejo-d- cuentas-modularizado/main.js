import { App } from './app.js';
import { Model } from './model.js';

function main() {
    const model = new Model();
    const app = new App(model);
    app.run();
}

window.onload = main;
