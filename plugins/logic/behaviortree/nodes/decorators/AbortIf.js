import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class AbortIf extends Decorator {

    constructor(
        {
            condition = 'true',
            returnSuccess = true,
            child = null,
            title,
            properties = {},
            name = 'AbortIf'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties: {
                    ...properties,
                    condition,
                    returnSuccess,
                },
            },
            nodePool
        );

        this.condition = CreateNumberExpression(condition, nodePool); // Expression node
        this.addExpression('condition', this.condition);
        this.returnSuccess = returnSuccess;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // child is running
        if (this.isChildRunning(tick)) {
            // Abort child if eval result is true
            if (!!tick.evalExpression(this.condition)) {
                return (this.returnSuccess) ? SUCCESS : FAILURE;
            }
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default AbortIf;
