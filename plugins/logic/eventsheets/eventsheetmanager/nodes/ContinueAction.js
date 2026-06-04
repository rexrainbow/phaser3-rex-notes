import { BreakAction as Base } from '../../../behaviortree/index.js';

class ContinueAction extends Base {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {
            if (config === undefined) {
                config = {};
            }
            config.tag = 'continue';
            super(config);
        }
    }

}

export default ContinueAction;
