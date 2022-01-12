import Decorator from '../core/Nodes/Decorator.js';
import { SUCCESS, ERROR, FAILURE } from '../constants.js';

class Repeat extends Decorator {

    constructor({
        maxLoop = -1,
        child = null,
        name = 'Repeat'
    } = {}) {

        super({
            child,
            name,
            properties: {
                maxLoop
            },
        });

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
        var status = SUCCESS;

        // Execute child many times in a tick
        while (maxLoop < 0 || i < maxLoop) {
            status = this.child._execute(tick);

            if (status == SUCCESS || status == FAILURE) {
                i++;
            } else {
                break;
            }
        }

        tick.blackboard.set('$i', i, tick.tree.id, this.id);
        return status;
    }
};

export default Repeat;
