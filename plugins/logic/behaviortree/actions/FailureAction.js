import Action from '../core/Nodes/Action';
import { FAILURE } from '../constants';

class FailureAction extends Action {

    constructor({
        name = 'FailureAction'
    } = {}) {

        super({
            name,
        });
    }

    tick(tick) {
        return FAILURE;
    }
};

export default FailureAction;
