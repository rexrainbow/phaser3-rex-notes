import Action from '../core/Nodes/Action.js';
import { RUNNING } from '../constants.js';

class Runner extends Action {

    constructor() {
        super({ name: 'Runner' });
    }

    tick(tick) {
        return RUNNING;
    }
};

export default Runner;
