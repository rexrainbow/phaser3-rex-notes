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
                description,
                properties = {}
            } = config;

            super({
                id,
                category: SERVICE,
                name,
                title,
                description,
                properties,
            });

            var expressions = config.expressions;
            interval = (expressions && (expressions.interval !== undefined)) ? expressions.interval : properties.interval;
            randomDeviation = (expressions && (expressions.randomDeviation !== undefined)) ? expressions.randomDeviation : properties.randomDeviation;

        } else {
            var {
                id,
                interval: intervalValue = 0,
                randomDeviation: randomDeviationValue = 0,
                name = 'Service',
                title,
                description,
                properties = {}
            } = config;

            super({
                id,
                category: SERVICE,
                name,
                title,
                description,
                properties: {
                    ...properties,
                    interval: intervalValue,
                    randomDeviation: randomDeviationValue,
                },
            });

            interval = intervalValue;
            randomDeviation = randomDeviationValue;
        }

        this.interval = CreateNumberExpression(interval, nodePool); // Expression node
        this.addExpression('interval', this.interval);

        this.randomDeviation = CreateNumberExpression(randomDeviation, nodePool); // Expression node
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
