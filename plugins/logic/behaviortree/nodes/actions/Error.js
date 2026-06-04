import Action from '../Action.js';
import { ERROR } from '../../constants.js';

class Error extends Action {

    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {  // New node
            var {
                services,
                title,
                properties,
                name = 'Error',
            } = config;

            super({
                services,
                title,
                properties,
                name,
            });

        }
    }

    tick(tick) {
        return ERROR;
    }
};

export default Error;
