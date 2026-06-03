import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';

class Limiter extends Decorator {

    constructor(
        {
            maxLoop = 1,
            child = null,
            title,
            properties = {},
            name = 'Limiter'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties,
            },
            nodePool
        );

        this.maxLoop = CreateNumberExpression(maxLoop, nodePool);  // Expression node
        this.addExpression('maxLoop', this.maxLoop);
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$maxLoop = this.maxLoop.eval(tick);
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
