import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';

class Limiter extends Decorator {

    constructor(config = {}, nodePool) {
        var maxLoop;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions;
            var properties = config.properties || {};
            maxLoop = (expressions && (expressions.maxLoop !== undefined)) ? expressions.maxLoop : properties.maxLoop;

        } else {
            var {
                maxLoop: maxLoopValue = 1,
                child = null,
                title,
                properties = {},
                name = 'Limiter'
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

        // Won't abort child
        var nodeMemory = this.getNodeMemory(tick);
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;

        // Open child before exceed maxLoop
        // Execute child 1 time in a tick
        if (i >= maxLoop) {
            return FAILURE;
        }

        var status = this.child._execute(tick);
        if ((status === SUCCESS) || (status === FAILURE)) {
            nodeMemory.$i = i + 1;
        }

        return status;
    }
};

export default Limiter;
