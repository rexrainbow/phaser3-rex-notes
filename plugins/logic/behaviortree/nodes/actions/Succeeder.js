import Action from '../Action.js';
import { SUCCESS } from '../../constants.js';

class Succeeder extends Action {

    constructor({
        title,
        name = 'Succeeder'
    } = {}) {

        super({
            title,
            name,
        });
    }

    tick(tick) {
        return SUCCESS;
    }
};

export default Succeeder;
