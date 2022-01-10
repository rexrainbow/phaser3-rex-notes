import Decorator from '../core/Nodes/Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../constants.js';


class Condition extends Decorator {

    constructor({ child = null, expression = 'true' } = {}) {
        super({
            child,
            name: 'Condition',
            properties: { expression: expression },
        });

        if (!expression) {
            throw 'expression parameter in Condition decorator is an obligatory parameter';
        }

        this.expression = this.addBooleanVariable(expression);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        if (!this.expression.eval(tick.blackboardContext)) {
            return FAILURE;
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default Condition;