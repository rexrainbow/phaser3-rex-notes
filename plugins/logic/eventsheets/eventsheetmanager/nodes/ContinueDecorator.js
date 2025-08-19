import {
    Decorator,
    SUCCESS, FAILURE
} from '../../../behaviortree/index.js';

class ContinueDecorator extends Decorator {
    constructor(
        {
            child = null,
            title,
            name = 'Continue'
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

        this.continueFlag = false;
    }

    setContinueFlag(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.continueFlag = enable;
        return this;
    }

    tick(tick) {
        if (!this.child) {
            return SUCCESS;
        }

        var status = this.child._execute(tick);

        // continueFlag will be set by BreakAction of grandchild node
        if (this.continueFlag) {
            status = SUCCESS;
            this.continueFlag = false;
        }

        return status;
    }
}

export default ContinueDecorator;