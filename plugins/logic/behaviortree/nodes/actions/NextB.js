import Action from '../Action.js';
import { NEXTA } from '../../constants.js';

class NextA extends Action {

    constructor({
        services,
        title,
        name = 'Next',
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick) {
        // Running next node forcely in Seqence node
        return NEXTA;
    }
};

export default NextA;
