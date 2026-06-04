import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, ERROR, FAILURE, RUNNING } from '../../constants.js';

class Repeat extends Decorator {

    constructor(config = {}, nodePool) {
        var maxLoop;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            maxLoop = expressions.maxLoop;

        } else {
            var {
                maxLoop: maxLoopValue = -1,  // expression
                child = null,
                title,
                name = 'Repeat'
            } = config;

            super(
                {
                    child,
                    title,
                    name,
                },
                nodePool
            );

            maxLoop = maxLoopValue;

        }

        // Expression node, or constant number/boolean
        this.maxLoop = CreateNumberExpression(maxLoop, nodePool);
        this.addExpression('maxLoop', this.maxLoop);
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

        var nodeMemory = this.getNodeMemory(tick);
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;
        var status = SUCCESS;

        // Open child before exceed maxLoop
        // Execute child many times in a tick
        while (maxLoop < 0 || i < maxLoop) {
            status = this.child._execute(tick);

            if ((status === SUCCESS) || (status === FAILURE)) {
                i++;
            } else {
                break;
            }
        }

        nodeMemory.$i = i;
        return status;
    }
};

export default Repeat;
