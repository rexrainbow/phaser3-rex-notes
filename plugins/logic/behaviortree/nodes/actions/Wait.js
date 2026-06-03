import Action from '../Action.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, RUNNING } from '../../constants.js';

class Wait extends Action {

    constructor(
        {
            duration = 0,
            services,
            title,
            properties,
            name = 'Wait'
        } = {},
        nodePool
    ) {

        super({
            title,
            name,
            properties,
            services,
        });

        this.duration = CreateNumberExpression(duration, nodePool); // Expression node
        this.addExpression('duration', this.duration);
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);

        nodeMemory.$startTime = tick.currentTime;
        nodeMemory.$duration = this.duration.eval(tick);
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
