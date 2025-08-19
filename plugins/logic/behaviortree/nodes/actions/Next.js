import Action from '../Action.js';
import { NEXT } from '../../constants.js';

class Next extends Action {

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
        return NEXT;
    }
};

export default Next;
