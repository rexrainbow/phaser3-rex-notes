import Action from '../Action.js';
import CreateNumberExpression from '../expressions/CreateNumberExpression.js';
import { SUCCESS, RUNNING } from '../../constants.js';

class Wait extends Action {

    constructor(config = {}, nodePool) {
        var duration;

        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

            var expressions = config.expressions;
            var properties = config.properties || {};
            duration = (expressions && (expressions.duration !== undefined)) ? expressions.duration : properties.duration;

        } else {  // New node
            var {
                duration: durationValue = 0,
                services,
                title,
                properties = {},
                name = 'Wait'
            } = config;

            super({
                title,
                name,
                properties: {
                    ...properties,
                    duration: durationValue,
                },
                services,
            });

            duration = durationValue;
        }

        this.duration = CreateNumberExpression(duration, nodePool); // Expression node
        this.addExpression('duration', this.duration);
    }

    open(tick) {
        var nodeMemory = this.getNodeMemory(tick);

        nodeMemory.$startTime = tick.currentTime;
        nodeMemory.$duration = tick.evalExpression(this.duration);
    }

    tick(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var currTime = tick.currentTime;
        var startTime = nodeMemory.$startTime;
        var duration = nodeMemory.$duration;

        if (duration > 0) {
            if ((currTime - startTime) < duration) {
                return RUNNING;
            }

        } else if (duration === 0) { // Wait 1 tick            
            if (currTime === startTime) {
                return RUNNING;
            }
        }

        return SUCCESS;
    }
};

export default Wait;
