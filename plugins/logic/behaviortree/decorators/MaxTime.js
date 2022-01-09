import Decorator from '../core/Nodes/Decorator.js';
import NumberVariable from '../core/Variable/NumberVariable.js';
import { FAILURE, ERROR } from '../constants.js';

class MaxTime extends Decorator {

    constructor({ maxTime, child = null } = {}) {
        super({
            child,
            name: 'MaxTime',
            title: 'Max <maxTime>ms',
            properties: { maxTime: 0 },
        });

        if (!maxTime) {
            throw 'maxTime parameter in MaxTime decorator is an obligatory parameter';
        }

        this.maxTimeExpression = new NumberVariable(maxTime);
        this.maxTime = undefined;
    }

    open(tick) {
        var startTime = tick.currentTime;
        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);

        this.maxTime = this.maxTimeExpression.eval(tick.blackboardContext);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var currTime = tick.currentTime;
        var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

        var status = this.child._execute(tick);
        if (currTime - startTime > this.maxTime) {
            return FAILURE;
        }

        return status;
    }
};

export default MaxTime;