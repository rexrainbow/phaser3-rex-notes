import Decorator from '../core/Nodes/Decorator.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../constants.js';

class Cooldown extends Decorator {
    constructor({
        duration,
        child = null,
        name = 'Cooldown'
    } = {}) {

        super({
            child,
            name,
            properties: {
                duration
            },
        });

        if (!duration) {
            throw 'duration parameter in Cooldown decorator is an obligatory parameter';
        }

        this.durationExpression = this.addNumberVariable(duration);
        this.duration = undefined;
    }

    open(tick) {
        var cooldownTime = this.durationExpression.eval(tick.blackboardContext);
        tick.blackboard.set('$cooldownTime', cooldownTime, tick.tree.id, this.id);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var currTime = tick.currentTime;
        var lastEndTime = tick.blackboard.get('$lastEndTime', tick.tree.id, this.id);
        var cooldownTime = tick.blackboard.get('$cooldownTime', tick.tree.id, this.id);
        if ((currTime - lastEndTime) < cooldownTime) {
            return FAILURE;
        }

        var status = this.child._execute(tick);
        if (status !== RUNNING) {
            tick.blackboard.set('$lastEndTime', currTime, tick.tree.id, this.id);
        }
        return status;
    }
};

export default Cooldown;