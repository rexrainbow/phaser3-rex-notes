import Action from '../Action.js';
import { ABORT } from '../../constants.js';

class Abort extends Action {

    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {  // New node
            var {
                services,
                title,
                properties,
                name = 'Abort',
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
        return ABORT;
    }
};

export default Abort;
