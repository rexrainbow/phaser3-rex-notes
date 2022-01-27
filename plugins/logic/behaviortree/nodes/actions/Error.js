import Action from '../Action.js';
import { ERROR } from '../../constants.js';

class Error extends Action {

    constructor({
        title,
        name = 'Error',
    } = {}) {

        super({
            title,
            name,
        });
    }

    tick(tick) {
        return ERROR;
    }
};

export default Error;
