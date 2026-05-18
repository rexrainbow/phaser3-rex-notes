import Decorator from '../Decorator';
import { FAILURE, SUCCESS, ERROR } from '../../constants';


class ContinueIf extends Decorator {
    child: any;
    expression: any;
    returnSuccess: any;

    addBooleanExpression: any;
    isChildRunning: any;


    constructor(
        {
            expression = 'true',
            returnSuccess = true,
            child = null,
            title,
            name = 'ContinueIf'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties: {
                    expression,
                    returnSuccess,
                },
            },
            nodePool
        );

        this.expression = this.addBooleanExpression(expression);
        this.returnSuccess = returnSuccess;
    }

    tick(tick?: any) {
        if (!this.child) {
            return ERROR;
        }

        // child is running
        if (this.isChildRunning(tick)) {
            // Abort child if eval result is false
            if (!tick.evalExpression(this.expression)) {
                return (this.returnSuccess) ? SUCCESS : FAILURE;
            }
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default ContinueIf;