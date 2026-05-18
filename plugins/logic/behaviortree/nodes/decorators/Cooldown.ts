import Decorator from '../Decorator';
import { SUCCESS, FAILURE, RUNNING, ABORT, ERROR } from '../../constants';

class Cooldown extends Decorator {
    child: any;

    addExpression: any;
    durationExpression: any;
    getNodeMemory: any;

    constructor(
        {
            duration = 0,
            child = null,
            title,
            name = 'Cooldown'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties: {
                    duration
                },
            },
            nodePool
        );

        this.durationExpression = this.addExpression(duration);
    }

    open(tick?: any) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$cooldownTime = tick.evalExpression(this.durationExpression);
    }

    tick(tick?: any) {
        if (!this.child) {
            return ERROR;
        }

        // Won't abort child
        var nodeMemory = this.getNodeMemory(tick);
        var currTime = tick.currentTime;
        var lastEndTime = nodeMemory.$lastEndTime;
        var cooldownTime = nodeMemory.$cooldownTime;

        // Open child after cooldown timeout
        if (
            (lastEndTime !== undefined) &&
            ((currTime - lastEndTime) < cooldownTime)
        ) {
            return FAILURE;
        }

        var status = this.child._execute(tick);

        if ((status === SUCCESS) || (status === FAILURE) || (status === ABORT)) {
            nodeMemory.$lastEndTime = currTime;
        }

        return status;
    }
};

export default Cooldown;