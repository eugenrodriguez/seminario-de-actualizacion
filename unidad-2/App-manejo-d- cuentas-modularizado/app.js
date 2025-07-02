import { UI } from './UI.js';
import { Model } from './model.js';

class App {
    constructor(model) {
        this.ui = new UI(model);
        this.model = model;
    }

    run() {
        while (true) {
            this.ui.menuDeInicio(this.model);
        }
    }
}

export { App };