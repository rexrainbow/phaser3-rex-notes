import Action from '../core/Nodes/Action.js';
import { FAILURE } from '../constants.js';

class Failer extends Action {

    constructor() {
        super({ name: 'Failer' });
    }

    tick(tick) {
        return FAILURE;
    }
};

export default Failer;