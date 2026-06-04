import Action from '../Action.js';
import { FAILURE } from '../../constants.js';

class Failer extends Action {

    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {  // New node
            var {
                services,
                title,
                properties,
                name = 'Failer'
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
        return FAILURE;
    }
};

export default Failer;
