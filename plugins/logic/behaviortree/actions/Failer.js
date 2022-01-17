import Action from '../core/Nodes/Action';
import { FAILURE } from '../constants';

class Failer extends Action {

    constructor({
        name = 'Failer'
    } = {}) {

        super({
            name,
        });
    }

    tick(tick) {
        return FAILURE;
    }
};

export default Failer;
