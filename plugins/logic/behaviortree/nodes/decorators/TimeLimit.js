import Decorator from '../Decorator.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, FAILURE, ERROR } from '../../constants.js';

class TimeLimit extends Decorator {
    constructor(config = {}, nodePool) {
        var duration, returnSuccess;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions;
            var properties = config.properties || {};
            duration = (expressions && (expressions.duration !== undefined)) ? expressions.duration : properties.duration;
            returnSuccess = properties.returnSuccess;

        } else {
            var {
                duration: durationValue = 0,
                returnSuccess: returnSuccessValue = true,
                child = null,
                title,
                properties = {},
                name = 'TimeLimit'
            } = config;

            super(
                {
                    child,
                    title,
                    name,
                    properties: {
                        ...properties,
                        duration: durationValue,
                        returnSuccess: returnSuccessValue
                    },
                },
                nodePool
            );

            duration = durationValue;
            returnSuccess = returnSuccessValue;

        }

        this.duration = CreateNumberExpression(duration, nodePool);  // Expression node
        this.addExpression('duration', this.duration);
        this.returnSuccess = returnSuccess;
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$startTime = tick.currentTime;
        nodeMemory.$duration = tick.evalExpression(this.duration);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // Abort child when timeout
        var nodeMemory = this.getNodeMemory(tick);
        var currTime = tick.currentTime;
        var startTime = nodeMemory.$startTime;
        var duration = nodeMemory.$duration;

        if ((currTime - startTime) >= duration) {
            return (this.returnSuccess) ? SUCCESS : FAILURE;
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default TimeLimit;
