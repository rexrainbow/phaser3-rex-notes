import Decorator from '../Decorator.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants.js';

class Cooldown extends Decorator {
    constructor(
        {
            duration = 0,
            child = null,
            name = 'Cooldown'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                name,
                properties: {
                    duration
                },
            },
            nodePool
        );

        this.durationExpression = this.addVariable(duration);
    }

    open(tick) {
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$cooldownTime = tick.evalExpression(this.durationExpression);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var nodeMemory = tick.getNodeMemory();
        var currTime = tick.currentTime;
        var lastEndTime = nodeMemory.$lastEndTime;
        var cooldownTime = nodeMemory.$cooldownTime;

        if (
            (lastEndTime !== undefined) &&
            ((currTime - lastEndTime) <= cooldownTime)
        ) {
            return FAILURE;
        }

        var status = this.child._execute(tick);

        if ((status === SUCCESS) || (status === FAILURE)) {
            nodeMemory.$lastEndTime = currTime;
        }

        return status;
    }
};

export default Cooldown;