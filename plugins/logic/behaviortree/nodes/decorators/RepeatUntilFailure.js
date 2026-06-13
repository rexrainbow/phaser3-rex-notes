import Decorator from '../Decorator.js';
import { CreateNumberExpression } from '../expressions/CreateExpression.js';
import { SUCCESS, FAILURE, ERROR } from '../../constants.js';

class RepeatUntilFailure extends Decorator {

    constructor(config = {}, nodePool) {
        var maxLoop;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            maxLoop = expressions.maxLoop;

        } else {
            var {
                maxLoop: maxLoopValue = -1,  // expression
                returnSuccess = false,  // mode
                child = null,
                title,
                properties = {},
                name = 'RepeatUntilFailure',
            } = config;

            super(
                {
                    child,
                    title,
                    properties: {
                        ...properties,
                        returnSuccess,
                    },
                    name,
                },
                nodePool
            );

            maxLoop = maxLoopValue;

        }

        // Expression node, or constant number/boolean
        this.maxLoop = CreateNumberExpression(maxLoop, nodePool);
        this.addExpression('maxLoop', this.maxLoop);

        this.returnSuccess = this.properties.returnSuccess;
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoop);
        nodeMemory.$i = 0;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // Won't abort child
        var nodeMemory = this.getNodeMemory(tick);
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;
        var status = ERROR;

        // Open child before exceed maxLoop
        // Execute child many times in a tick
        while ((maxLoop < 0) || (i < maxLoop)) {
            status = this.child._execute(tick);

            if (status === SUCCESS) {
                i++;
            } else {
                break;
            }
        }

        nodeMemory.$i = i;

        if ((status === this.FAILURE) && this.returnSuccess) {
            status = SUCCESS;
        }

        return status;
    }
};

export default RepeatUntilFailure;
