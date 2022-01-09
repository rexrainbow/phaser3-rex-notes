import Action from '../core/Nodes/Action';
import NumberVariable from '../core/Variable/NumberVariable.js';
import { SUCCESS, RUNNING } from '../constants';

class Wait extends Action {

    constructor({ milliseconds = 0 } = {}) {
        super({
            name: 'Wait',
            title: 'Wait <milliseconds>ms',
            properties: { milliseconds: 0 },
        });

        this.endTimeExpression = new NumberVariable(milliseconds);
        this.endTime = undefined;
    }

    open(tick) {
        var startTime = tick.currentTime;
        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);

        this.endTime = this.endTimeExpression.eval(tick.blackboardContext);
    }

    tick(tick) {
        var currTime = tick.currentTime;
        var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

        if ((currTime - startTime) > this.endTime) {
            return SUCCESS;
        }

        return RUNNING;
    }
};

export default Wait;
