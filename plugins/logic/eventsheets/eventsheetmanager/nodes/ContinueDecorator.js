import { BreakDecorator as Base } from '../../../behaviortree/index.js';

class ContinueDecorator extends Base {
    constructor(
        config,
        nodePool
    ) {
        if (config === undefined) {
            config = {};
        }
        config.tag = 'continue';
        super(
            config,
            nodePool
        );

    }
}

export default ContinueDecorator;