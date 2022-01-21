import Action from '../Action.js';
import { FAILURE } from '../../constants.js';

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
