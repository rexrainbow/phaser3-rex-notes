import Action from '../Action';
import { FAILURE } from '../../constants';

class Failer extends Action {

    constructor({
        services,
        title,
        name = 'Failer'
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick?: any) {
        return FAILURE;
    }
};

export default Failer;