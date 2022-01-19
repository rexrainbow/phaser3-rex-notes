import Composite from '../core/Nodes/Composite.js';
import { SUCCESS, FAILURE, RUNNING } from '../constants.js';

class IfBranch extends Composite {
    constructor({
        expression = null,
        children = [],
        name = 'IfBranch'
    } = {}) {

        super({
            children: children,
            name,
            properties: {
                expression
            },
        });


        if (!expression) {
            throw 'expression parameter in IfBranch composite is an obligatory parameter';
        }

        this.expression = this.addBooleanVariable(expression);
    }

    tick(tick) {
        var index = tick.evalExpression(this.expression) ? 0 : 1;
        var child = this.children[index];
        if (!child) {
            return FAILURE;
        }

        var status = child._execute(tick);
        return status;
    }
};

export default IfBranch;