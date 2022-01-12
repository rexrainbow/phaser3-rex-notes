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
        var startTime = tick.currentTime;
        tick.blackboard.set('$startTime', startTime, tick.tree.id, this.id);

        var duration = this.durationExpression.eval(tick.blackboardContext);
        tick.blackboard.set('$duration', duration, tick.tree.id, this.id);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var currTime = tick.currentTime;
        var startTime = tick.blackboard.get('$startTime', tick.tree.id, this.id);
        var duration = tick.blackboard.get('$duration', tick.tree.id, this.id);

        var status = this.child._execute(tick);
        if ((currTime - startTime) > duration) {
            return FAILURE;
        }

        return status;
    }
};

export default TimeLimit;