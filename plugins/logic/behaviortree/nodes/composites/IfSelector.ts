import Composite from '../Composite';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../../constants';

class IfSelector extends Composite {
    conditionEvalBreak: any;
    expression: any;

    addBooleanExpression: any;
    forceSelectChildIndex: any;
    getNodeMemory: any;

    constructor(
        {
            expression = 'true',
            conditionEvalBreak = false,
            children = [],
            services,
            title,
            name = 'IfSelector'
        } = {},
        nodePool
    ) {

        super(
            {
                children: children,
                services,
                title,
                name,
                properties: {
                    expression,
                    conditionEvalBreak,
                },
            },
            nodePool
        );

        this.expression = this.addBooleanExpression(expression);
        this.conditionEvalBreak = conditionEvalBreak;
        this.forceSelectChildIndex = undefined;
    }

    open(tick?: any) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$runningChild = -1;  // No running child
    }

    setSelectChildIndex(index?: any) {
        this.forceSelectChildIndex = index;
        return this;
    }

    evalCondition(tick?: any) {
        if (this.forceSelectChildIndex !== undefined) {
            return this.forceSelectChildIndex;
        }

        return tick.evalExpression(this.expression) ? 0 : 1;
    }

    tick(tick?: any) {
        if (this.children.length === 0) {
            return ERROR;
        }

        var nodeMemory = this.getNodeMemory(tick);
        var childIndex = nodeMemory.$runningChild;
        if (childIndex < 0) {
            childIndex = this.evalCondition(tick);
            if (this.conditionEvalBreak) {
                // Resolve runningChild index, but not run child now
                nodeMemory.$runningChild = childIndex;
                return RUNNING;
            }
        }

        var child = this.children[childIndex];
        var status = child._execute(tick);
        nodeMemory.$runningChild = (status === RUNNING) ? childIndex : -1;

        return status;
    }

    abortChildren(tick?: any) {
        var nodeMemory = this.getNodeMemory(tick);
        var child = this.children[nodeMemory.$runningChild];
        if (child?: any) {
            child._abort(tick);
            nodeMemory.$runningChild = -1;
        }
    }
};

export default IfSelector;