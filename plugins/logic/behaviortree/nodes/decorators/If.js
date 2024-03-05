import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class If extends Decorator {

    constructor(
        {
            expression = 'true',
            conditionEvalBreak = false,
            child = null,
            title,
            name = 'If'
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
                    conditionEvalBreak
                },
            },
            nodePool
        );

        this.expression = this.addBooleanExpression(expression);
        this.conditionEvalBreak = conditionEvalBreak;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // child is not running
        if (!this.isChildRunning(tick)) {
            // Return FAILURE to run next node
            if (!tick.evalExpression(this.expression)) {
                return FAILURE;
            } else if (this.conditionEvalBreak) {
                // Open child but not run it now
                this.openChild();
                return RUNNING;
            }
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default If;