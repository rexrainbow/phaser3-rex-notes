import Action from '../Action.js';
import { ERROR } from '../../constants.js';

class Error extends Action {

    constructor({
        name = 'Error',
    } = {}) {

        super({
            name,
        });
    }

    tick(tick) {
        return ERROR;
    }
};

export default Error;
