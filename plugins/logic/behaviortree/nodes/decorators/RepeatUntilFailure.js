import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, FAILURE, ERROR } from '../../constants.js';

class RepeatUntilFailure extends Decorator {

    constructor(config = {}, nodePool) {
        var maxLoop, returnSuccess;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions;
            var properties = config.properties || {};
            maxLoop = (expressions && (expressions.maxLoop !== undefined)) ? expressions.maxLoop : properties.maxLoop;
            returnSuccess = properties.returnSuccess;

        } else {
            var {
                maxLoop: maxLoopValue = -1,
                returnSuccess: returnSuccessValue = false,
                child = null,
                title,
                properties = {},
                name = 'RepeatUntilFailure',
            } = config;

            super(
                {
                    child,
                    title,
                    name,
                    properties: {
                        ...properties,
                        maxLoop: maxLoopValue,
                        returnSuccess: returnSuccessValue,
                    },
                },
                nodePool
            );

            maxLoop = maxLoopValue;
            returnSuccess = returnSuccessValue;

        }

        this.maxLoop = CreateNumberExpression(maxLoop, nodePool);  // Expression node
        this.addExpression('maxLoop', this.maxLoop);
        this.returnSuccess = returnSuccess;
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
