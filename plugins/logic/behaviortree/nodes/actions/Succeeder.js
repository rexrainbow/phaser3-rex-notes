import Action from '../Action.js';
import { SUCCESS } from '../../constants.js';

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
