import Action from '../Action.js';
import { NEXTB } from '../../constants.js';

class NextB extends Action {

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
        return NEXTB;
    }
};

export default NextB;
