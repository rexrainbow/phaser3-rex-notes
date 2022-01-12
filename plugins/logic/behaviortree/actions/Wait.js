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
        var startTime = tick.currentTime;
        tick.blackboard.set('$startTime', startTime, tick.tree.id, this.id);

        var duration = this.durationExpression.eval(tick.blackboardContext);
        tick.blackboard.set('$duration', duration, tick.tree.id, this.id);
    }

    tick(tick) {
        var currTime = tick.currentTime;
        var startTime = tick.blackboard.get('$startTime', tick.tree.id, this.id);
        var duration = tick.blackboard.get('$duration', tick.tree.id, this.id);

        if ((currTime - startTime) > duration) {
            return SUCCESS;
        }

        return RUNNING;
    }
};

export default Wait;
