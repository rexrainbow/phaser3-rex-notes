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
    }

    open(tick) {
        var maxLoop = this.maxLoopExpression.eval(tick.blackboardContext);
        tick.blackboard.set('$maxLoop', maxLoop, tick.tree.id, this.id);

        tick.blackboard.set('$i', 0, tick.tree.id, this.id);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var maxLoop = tick.blackboard.get('$maxLoop', tick.tree.id, this.id);
        var i = tick.blackboard.get('$i', tick.tree.id, this.id);

        // Execute child 1 time in a tick
        if (i < maxLoop) {
            var status = this.child._execute(tick);

            if (status == SUCCESS || status == FAILURE) {
                tick.blackboard.set('$i', i + 1, tick.tree.id, this.id);
            }

            return status;
        }

        return FAILURE;
    }
};

export default Limiter;