import {
    Decorator,
    SUCCESS, FAILURE
} from '../../../behaviortree/index.js';

class BreakDecorator extends Decorator {
    constructor(
        {
            child = null,
            title,
            name = 'Break'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
            },
            nodePool
        );

        this.breakFlag = false;
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