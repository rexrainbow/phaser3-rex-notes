import Action from '../Action.js';
import { FAILURE } from '../../constants.js';

class Failer extends Action {

    constructor({
        title,
        name = 'Failer'
    } = {}) {

        super({
            title,
            name,
        });
    }

    tick(tick) {
        return FAILURE;
    }
};

export default Failer;
