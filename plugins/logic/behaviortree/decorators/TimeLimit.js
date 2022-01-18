import Decorator from '../core/Nodes/Decorator.js';
import { FAILURE, ERROR } from '../constants.js';

class TimeLimit extends Decorator {
    constructor({
        duration,
        child = null,
        name = 'TimeLimit'
    } = {}) {

        super({
            child,
            name,
            properties: {
                duration
            },
        });

        if (!duration) {
            throw 'duration parameter in TimeLimit decorator is an obligatory parameter';
        }

        this.durationExpression = this.addNumberVariable(duration);
    }

    open(tick) {
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$startTime = tick.currentTime;
        nodeMemory.$duration = tick.evalExpression(this.durationExpression);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var nodeMemory = tick.getNodeMemory();
        var currTime = tick.currentTime;
        var startTime = nodeMemory.$startTime;
        var duration = nodeMemory.$duration;

        if ((currTime - startTime) > duration) {
            return FAILURE;
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default TimeLimit;