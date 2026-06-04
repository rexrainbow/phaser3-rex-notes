import Action from '../Action.js';
import { RUNNING } from '../../constants.js';

class Runner extends Action {

    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {  // New node
            var {
                services,
                title,
                properties,
                name = 'Runner'
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
        return RUNNING;
    }
};

export default Runner;
