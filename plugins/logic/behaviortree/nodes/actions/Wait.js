import Action from '../Action.js';
import { SUCCESS, RUNNING } from '../../constants.js';

class Wait extends Action {

    constructor({
        duration = 0,
        services,
        title,
        name = 'Wait'
    } = {}) {

        super({
            title,
            name,
            properties: {
                duration
            },
            services,
        });

        this.durationExpression = this.addExpression(duration);
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);

        nodeMemory.$startTime = tick.currentTime;
        nodeMemory.$duration = tick.evalExpression(this.durationExpression);
    }

    tick(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var currTime = tick.currentTime;
        var startTime = nodeMemory.$startTime;
        var duration = nodeMemory.$duration;

        if (duration > 0) {
            if ((currTime - startTime) < duration) {
                return RUNNING;
            }

        } else if (duration === 0) { // Wait 1 tick            
            if (currTime === startTime) {
                return RUNNING;
            }
        }

        return SUCCESS;
    }
};

export default Wait;
