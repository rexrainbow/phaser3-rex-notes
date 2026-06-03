import Decorator from '../Decorator.js';
import { SUCCESS } from '../../constants.js';

class BreakDecorator extends Decorator {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {
            var {
                child = null,
                title,
                properties = {},
                name = 'Break',
                tag,
            } = config;

            super(
                {
                    child,
                    title,
                    name,
                    properties: {
                        ...properties,
                        tag
                    }
                },
                nodePool
            );

        }

        this.breakFlag = false;
        this.tag = this.properties.tag;
    }

    setBreakFlag(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.breakFlag = enable;
        return this;
    }

    tick(tick) {
        if (!this.child) {
            return SUCCESS;
        }

        var status = this.child._execute(tick);

        // breakFlag will be set by BreakAction of grandchild node
        if (this.breakFlag) {
            status = SUCCESS;
            this.breakFlag = false;
        }

        return status;
    }
}

export default BreakDecorator;
