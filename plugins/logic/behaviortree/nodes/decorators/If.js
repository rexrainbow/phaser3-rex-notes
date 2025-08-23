import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class If extends Decorator {

    constructor(
        {
            expression = 'true',
            conditionEvalBreak = false,
            onFailState = FAILURE,
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
                    conditionEvalBreak,
                    onFailState
                },
            },
            nodePool
        );

        this.expression = this.addBooleanExpression(expression);
        this.conditionEvalBreak = conditionEvalBreak;
        this.onFailState = onFailState;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // child is not running
        if (!this.isChildRunning(tick)) {
            /*
            If expression return false:
              - Don't run child node
              - Return SUCCESS to run next child for Sequence node, or 
                - Equal to `ForceSuccess + If`
              - Return FAILURE for Selector node
            */
            if (!tick.evalExpression(this.expression)) {
                return this.onFailState;
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