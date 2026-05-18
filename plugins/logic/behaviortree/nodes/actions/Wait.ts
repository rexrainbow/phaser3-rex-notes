import Action from '../Action';
import { SUCCESS, RUNNING } from '../../constants';

class Wait extends Action {
    addExpression: any;
    durationExpression: any;
    getNodeMemory: any;


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

    open(tick?: any) {
        var nodeMemory = this.getNodeMemory(tick);

        nodeMemory.$startTime = tick.currentTime;
        nodeMemory.$duration = tick.evalExpression(this.durationExpression);
    }

    tick(tick?: any) {
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