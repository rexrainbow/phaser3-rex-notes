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
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$cooldownTime = tick.evalExpression(this.durationExpression);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var nodeMemory = tick.getNodeMemory();
        var currTime = tick.currentTime;
        var lastEndTime = nodeMemory.$lastEndTime || 0;
        var cooldownTime = nodeMemory.$cooldownTime;
        if ((currTime - lastEndTime) < cooldownTime) {
            return FAILURE;
        }

        var status = this.child._execute(tick);
        if (status !== RUNNING) {
            nodeMemory.$lastEndTime = currTime;
        }
        return status;
    }
};

export default Cooldown;