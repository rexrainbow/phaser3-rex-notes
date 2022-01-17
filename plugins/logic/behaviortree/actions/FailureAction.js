import Action from '../core/Nodes/Action';
import { FAILURE } from '../constants';

class SuccessAction extends Action {

    constructor({
        name = 'SuccessAction'
    } = {}) {

        super({
            name,
        });
    }

    tick(tick) {
        return FAILURE;
    }
};

export default SuccessAction;
