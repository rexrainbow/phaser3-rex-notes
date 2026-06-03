import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { FAILURE, ERROR } from '../../constants.js';

class TimeLimit extends Decorator {
    constructor(
        {
            duration = 0,
            returnSuccess = true,
            child = null,
            title,
            properties = {},
            name = 'TimeLimit'
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
                    returnSuccess
                },
            },
            nodePool
        );

        this.duration = CreateNumberExpression(duration, nodePool);  // Expression node
        this.addExpression('duration', this.duration);
        this.returnSuccess = returnSuccess;
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$startTime = tick.currentTime;
        nodeMemory.$duration = this.duration.eval(tick);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // Abort child when timeout
        var nodeMemory = this.getNodeMemory(tick);
        var currTime = tick.currentTime;
        var startTime = nodeMemory.$startTime;
        var duration = nodeMemory.$duration;

        if ((currTime - startTime) >= duration) {
            return (this.returnSuccess) ? SUCCESS : FAILURE;
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default TimeLimit;
