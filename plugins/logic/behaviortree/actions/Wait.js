import Action from '../core/Nodes/Action';
import { SUCCESS, RUNNING } from '../constants';

class Wait extends Action {

    constructor({
        duration = 0,
        name = 'Wait'
    } = {}) {

        super({
            name,
            properties: {
                duration
            },
        });

        this.durationExpression = this.addNumberVariable(duration);
    }

    open(tick) {
        var nodeMemory = tick.getNodeMemory();

        nodeMemory.$startTime = tick.currentTime;
        nodeMemory.$duration = this.durationExpression.eval(tick.blackboardContext);
    }

    tick(tick) {
        var nodeMemory = tick.getNodeMemory();
        var currTime = tick.currentTime;
        var startTime = nodeMemory.$startTime;
        var duration = nodeMemory.$duration;

        if ((currTime - startTime) > duration) {
            return SUCCESS;
        }

        return RUNNING;
    }
};

export default Wait;
