import Action from '../Action';
import { ABORT } from '../../constants';

class Abort extends Action {

    constructor({
        services,
        title,
        name = 'Abort',
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick?: any) {
        return ABORT;
    }
};

export default Abort;