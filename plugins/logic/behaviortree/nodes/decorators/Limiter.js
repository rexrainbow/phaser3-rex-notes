import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';

class Limiter extends Decorator {

    constructor(
        {
            maxLoop = 1,
            child = null,
            name = 'Limiter'
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