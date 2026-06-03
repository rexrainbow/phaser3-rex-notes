import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, ERROR, FAILURE, RUNNING } from '../../constants.js';

class Repeat extends Decorator {

    constructor(config = {}, nodePool) {
        var maxLoop;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions;
            var properties = config.properties || {};
            maxLoop = (expressions && (expressions.maxLoop !== undefined)) ? expressions.maxLoop : properties.maxLoop;

        } else {
            var {
                maxLoop: maxLoopValue = -1,
                child = null,
                title,
                properties = {},
                name = 'Repeat'
            } = config;

            super(
                {
                    child,
                    title,
                    name,
                    properties: {
                        ...properties,
                        maxLoop: maxLoopValue,
                    },
                },
                nodePool
            );

            maxLoop = maxLoopValue;

        }

        this.maxLoop = CreateNumberExpression(maxLoop, nodePool);  // Expression node
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
