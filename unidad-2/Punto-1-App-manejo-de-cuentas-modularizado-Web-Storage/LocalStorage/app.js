import { UI } from './UI.js';
import { Model } from './model.js';

class App {
    constructor(model) {
        this.ui = new UI(model);
    }

    run() {
        this.ui.menuDeInicio();
    }
}

export { App };