import Decorator from '../core/Nodes/Decorator.js';
import NumberVariable from '../core/Variable/NumberVariable.js';
import { SUCCESS, ERROR, FAILURE } from '../constants.js';

class Repeater extends Decorator {

    constructor({ maxLoop = -1, child = null } = {}) {
        super({
            child,
            name: 'Repeater',
            title: 'Repeat <maxLoop>x',
            properties: { maxLoop: -1 },
        });

        this.maxLoopExpression = new NumberVariable(maxLoop);
        this.maxLoop = undefined;
    }

    open(tick) {
        tick.blackboard.set('i', 0, tick.tree.id, this.id);

        this.maxLoop = this.maxLoopExpression.eval(tick.blackboard);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var i = tick.blackboard.get('i', tick.tree.id, this.id);
        var status = SUCCESS;

        while (this.maxLoop < 0 || i < this.maxLoop) {
            status = this.child._execute(tick);

            if (status == SUCCESS || status == FAILURE) {
                i++;
            } else {
                break;
            }
        }

        tick.blackboard.set('i', i, tick.tree.id, this.id);
        return status;
    }
};

export default Repeater;
