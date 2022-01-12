import Action from '../core/Nodes/Action';
import { SUCCESS, RUNNING } from '../constants';

class Wait extends Action {

    constructor({
        time = 0,
        name = 'Wait'
    } = {}) {

        super({
            name,
            properties: {
                time
            },
        });

        this.endTimeExpression = this.addNumberVariable(time);
        this.endTime = undefined;
    }

    open(tick) {
        var startTime = tick.currentTime;
        tick.blackboard.set('$startTime', startTime, tick.tree.id, this.id);

        this.endTime = this.endTimeExpression.eval(tick.blackboardContext);
    }

    tick(tick) {
        var currTime = tick.currentTime;
        var startTime = tick.blackboard.get('$startTime', tick.tree.id, this.id);

        if ((currTime - startTime) > this.endTime) {
            return SUCCESS;
        }

        return RUNNING;
    }
};

export default Wait;
