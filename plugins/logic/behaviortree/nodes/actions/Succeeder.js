import Action from '../Action.js';
import { SUCCESS } from '../../constants.js';

class Succeeder extends Action {

    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {  // New node
            var {
                services,
                title,
                name = 'Succeeder'
            } = config;

            super({
                services,
                title,
                name,
            });

        }
    }

    tick(tick) {
        return SUCCESS;
    }
};

export default Succeeder;
