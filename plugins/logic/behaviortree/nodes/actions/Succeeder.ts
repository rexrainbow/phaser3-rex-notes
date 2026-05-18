import Action from '../Action';
import { SUCCESS } from '../../constants';

class Succeeder extends Action {

    constructor({
        services,
        title,
        name = 'Succeeder'
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick?: any) {
        return SUCCESS;
    }
};

export default Succeeder;