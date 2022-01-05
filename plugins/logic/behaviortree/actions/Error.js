import { ERROR } from '../constants.js';
import Action from '../core/Nodes/Action.js';

class Error extends Action {

    constructor() {
        super({ name: 'Error' });
    }

    tick(tick) {
        return ERROR;
    }
};

export default Error;