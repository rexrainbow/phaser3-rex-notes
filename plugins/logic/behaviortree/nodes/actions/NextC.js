import Action from '../Action.js';
import { NEXTC } from '../../constants.js';

class NextC extends Action {

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
        return NEXTC;
    }
};

export default NextC;
