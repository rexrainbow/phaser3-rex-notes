import Action from '../core/Nodes/Action.js';
import { SUCCESS } from '../constants.js';

class Succeeder extends Action {

    constructor() {
        super({ name: 'Succeeder' });
    }

    tick(tick) {
        return SUCCESS;
    }
};

export default Succeeder;
