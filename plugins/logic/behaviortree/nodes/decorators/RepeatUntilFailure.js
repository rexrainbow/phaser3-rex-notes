import Decorator from '../Decorator.js';
import { SUCCESS, ERROR } from '../../constants.js';

class RepeatUntilFailure extends Decorator {

    constructor(
        {
            maxLoop = -1,
            child = null,
            name = 'RepeatUntilFailure',
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                name,
                properties: {
                    maxLoop
                },
            },
            nodePool
        );

        this.maxLoopExpression = this.addVariable(maxLoop);
    }

    open(tick) {
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
        nodeMemory.$i = 0;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var nodeMemory = tick.getNodeMemory();
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;
        var status = ERROR;

        // Execute child many times in a tick
        while (maxLoop < 0 || i < maxLoop) {
            status = this.child._execute(tick);

            if (status === SUCCESS) {
                i++;
            } else {
                break;
            }
        }

        nodeMemory.$i = i;
        return status;
    }
};

export default RepeatUntilFailure;
