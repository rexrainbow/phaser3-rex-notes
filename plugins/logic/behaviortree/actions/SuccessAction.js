import Action from '../core/Nodes/Action';
import { SUCCESS } from '../constants';

class SuccessAction extends Action {

    constructor({
        name = 'SuccessAction'
    } = {}) {

        super({
            name,
        });
    }

    tick(tick) {
        return SUCCESS;
    }
};

export default SuccessAction;
