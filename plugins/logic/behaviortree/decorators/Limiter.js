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
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$maxLoop = this.maxLoopExpression.eval(tick.blackboardContext);
        nodeMemory.$i = 0;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var nodeMemory = tick.getNodeMemory();
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;

        // Execute child 1 time in a tick
        if (i < maxLoop) {
            var status = this.child._execute(tick);

            if (status == SUCCESS || status == FAILURE) {
                nodeMemory.$i = i + 1;
            }

            return status;
        }

        return FAILURE;
    }
};

export default Limiter;