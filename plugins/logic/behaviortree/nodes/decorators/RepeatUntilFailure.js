import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, FAILURE, ERROR } from '../../constants.js';

class RepeatUntilFailure extends Decorator {

    constructor(
        {
            maxLoop = -1,
            returnSuccess = false,
            child = null,
            title,
            properties = {},
            name = 'RepeatUntilFailure',
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties: {
                    ...properties,
                    returnSuccess,
                },
            },
            nodePool
        );

        this.maxLoop = CreateNumberExpression(maxLoop, nodePool);  // Expression node
        this.addExpression('maxLoop', this.maxLoop);
        this.returnSuccess = returnSuccess;
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
