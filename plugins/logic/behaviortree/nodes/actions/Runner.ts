import Action from '../Action';
import { RUNNING } from '../../constants';

class Runner extends Action {

    constructor({
        services,
        title,
        name = 'Runner'
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick?: any) {
        return RUNNING;
    }
};

export default Runner;