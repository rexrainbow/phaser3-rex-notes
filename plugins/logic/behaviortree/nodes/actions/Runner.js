import Action from '../Action.js';
import { RUNNING } from '../../constants.js';

class Runner extends Action {

    constructor({
        title,
        name = 'Runner'
    } = {}) {

        super({
            title,
            name,
        });
    }

    tick(tick) {
        return RUNNING;
    }
};

export default Runner;
