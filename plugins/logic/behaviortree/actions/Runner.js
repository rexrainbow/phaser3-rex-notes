import Action from '../core/Nodes/Action';
import { RUNNING } from '../constants';

class Runner extends Action {

    constructor({
        name = 'Runner'
    } = {}) {

        super({
            name,
        });
    }

    tick(tick) {
        return RUNNING;
    }
};

export default Runner;
