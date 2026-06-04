import BaseNode from './BaseNode.js';
import CreateNumberExpression from './expressions/CreateNumberExpression.js';
import { SERVICE } from '../constants.js';

class Service extends BaseNode {

    constructor(config = {}, nodePool) {
        var interval, randomDeviation;

        if (nodePool) {
            var {
                id,
                name = 'Service',
                title,
                properties,
                description,
            } = config;

            super({
                id,
                category: SERVICE,
                name,
                title,
                properties,
                description,
            });

            var expressions = config.expressions || {};
            interval = expressions.interval;
            randomDeviation = expressions.randomDeviation;

        } else {
            var {
                interval: intervalValue = 0,                // expression
                randomDeviation: randomDeviationValue = 0,  // expression
                name = 'Service',
                title,
                properties,
                description,
            } = config;

            super({
                category: SERVICE,
                name,
                title,
                description,
                properties,
            });

            interval = intervalValue;
            randomDeviation = randomDeviationValue;
        }

        // Expression node, or constant number/boolean
        this.interval = CreateNumberExpression(interval, nodePool);
        this.addExpression('interval', this.interval);

        // Expression node, or constant number/boolean
        this.randomDeviation = CreateNumberExpression(randomDeviation, nodePool);
        this.addExpression('randomDeviation', this.randomDeviation);
    }

    _tick(tick) {
        if (this.canTick(tick)) {
            this.tick(tick);
        }
    }

    canTick(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        var currTime = tick.currentTime;
        var lastEndTime = nodeMemory.$lastEndTime;
        var interval = nodeMemory.$interval;

        var canTick = (lastEndTime === undefined) ||
            ((currTime - lastEndTime) >= interval);

        if (canTick) {
            nodeMemory.$lastEndTime = currTime;

            var interval = tick.evalExpression(this.interval);
            var randomDeviation = tick.evalExpression(this.randomDeviation);
            if (randomDeviation > 0) {
                interval += (0.5 - Math.random()) * randomDeviation;
            }
            nodeMemory.$interval = interval;
        }

        return canTick;
    }

};

export default Service;
