import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, FAILURE, RUNNING, ABORT, ERROR } from '../../constants.js';

class Cooldown extends Decorator {
    constructor(config = {}, nodePool) {
        var duration;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions || {};
            duration = expressions.duration;

        } else {
            var {
                duration: durationValue = 0,  // expression
                child = null,
                title,
                name = 'Cooldown'
            } = config;

            super(
                {
                    child,
                    title,
                    name,
                },
                nodePool
            );

            duration = durationValue;

        }

        // Expression node, or constant number/boolean
        this.duration = CreateNumberExpression(duration, nodePool);
        this.addExpression('duration', this.duration);
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$cooldownTime = tick.evalExpression(this.duration);
    }

    tick(tick) {
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
