import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class If extends Decorator {

    constructor(
        {
            expression = 'true',
            child = null,
            name = 'If'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                name,
                properties: {
                    expression
                },
            },
            nodePool
        );

        if (!expression) {
            throw 'expression parameter in If decorator is an obligatory parameter';
        }

        this.expression = this.addBooleanVariable(expression);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        if (!tick.evalExpression(this.expression)) {
            return FAILURE;
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default If;