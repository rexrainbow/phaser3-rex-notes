import Action from '../Action.js';
import { NEXTD } from '../../constants.js';

class NextD extends Action {

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
        return NEXTD;
    }
};

export default NextD;
