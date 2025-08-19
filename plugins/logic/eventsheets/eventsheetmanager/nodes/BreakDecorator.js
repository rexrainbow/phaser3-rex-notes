import { BreakDecorator as Base } from '../../../behaviortree/index.js';

class BreakDecorator extends Base {
    constructor(
        config,
        nodePool
    ) {
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

export default BreakDecorator;