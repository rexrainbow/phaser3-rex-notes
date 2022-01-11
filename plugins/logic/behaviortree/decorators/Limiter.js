import Decorator from '../core/Nodes/Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../constants.js';

class Limiter extends Decorator {

    constructor({
        maxLoop = 1,
        child = null,
        name = 'Limiter'
    } = {}) {

        super({
            child,
            name,
            properties: {
                maxLoop
            },
        });

        if (!maxLoop) {
            throw 'maxLoop parameter in Limiter decorator is an obligatory parameter';
        }

        this.maxLoopExpression = this.addNumberVariable(maxLoop);
        this.maxLoop = null;
    }

    open(tick) {
        tick.blackboard.set('i', 0, tick.tree.id, this.id);
        this.maxLoop = this.maxLoopExpression.eval(tick.blackboardContext);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var i = tick.blackboard.get('i', tick.tree.id, this.id);

        if (i < this.maxLoop) {
            var status = this.child._execute(tick);

            if (status == SUCCESS || status == FAILURE) {
                tick.blackboard.set('i', i + 1, tick.tree.id, this.id);
            }

            return status;
        }

        return FAILURE;
    }
};

export default Limiter;