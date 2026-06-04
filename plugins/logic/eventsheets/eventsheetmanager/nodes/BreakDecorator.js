import { BreakDecorator as Base } from '../../../behaviortree/index.js';

class BreakDecorator extends Base {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {
            if (config === undefined) {
                config = {};
            }
            config.tag = 'break';
            super(
                config,
                nodePool
            );
        }
    }
}

export default BreakDecorator;
