import Action from '../Action';
import { ERROR } from '../../constants';

class Error extends Action {

    constructor({
        services,
        title,
        name = 'Error',
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick?: any) {
        return ERROR;
    }
};

export default Error;