import Action from '../core/Nodes/Action';
import { ERROR } from '../constants';

class Error extends Action {

    constructor({
        name = 'Error'
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
