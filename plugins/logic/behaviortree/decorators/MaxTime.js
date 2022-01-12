import Decorator from '../core/Nodes/Decorator.js';
import { FAILURE, ERROR } from '../constants.js';

class MaxTime extends Decorator {
    constructor({
        maxTime,
        child = null,
        name = 'MaxTime'
    } = {}) {

        super({
            child,
            name,
            properties: {
                maxTime
            },
        });

        if (!maxTime) {
            throw 'maxTime parameter in MaxTime decorator is an obligatory parameter';
        }

        this.maxTimeExpression = this.addNumberVariable(maxTime);
        this.maxTime = undefined;
    }

    open(tick) {
        var startTime = tick.currentTime;
        tick.blackboard.set('$startTime', startTime, tick.tree.id, this.id);

        this.maxTime = this.maxTimeExpression.eval(tick.blackboardContext);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var currTime = tick.currentTime;
        var startTime = tick.blackboard.get('$startTime', tick.tree.id, this.id);

        var status = this.child._execute(tick);
        if (currTime - startTime > this.maxTime) {
            return FAILURE;
        }

        return status;
    }
};

export default MaxTime;