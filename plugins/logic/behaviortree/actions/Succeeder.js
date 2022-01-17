import Action from '../core/Nodes/Action';
import { SUCCESS } from '../constants';

class Succeeder extends Action {

    constructor({
        name = 'Succeeder'
    } = {}) {

        super({
            name,
        });
    }

    tick(tick) {
        return SUCCESS;
    }
};

export default Succeeder;
