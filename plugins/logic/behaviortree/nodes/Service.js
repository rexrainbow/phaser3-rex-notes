import BaseNode from './BaseNode.js';
import CreateNumberExpression from './expressions/CreateNumberExpression.js';
import { SERVICE } from '../constants.js';

class Service extends BaseNode {

    constructor(
        {
            interval = 0,
            randomDeviation = 0,
            name = 'Service',
            title,
            properties = {}
        } = {},
        nodePool
    ) {

        super({
            category: SERVICE,
            name,
            title,
            properties: {
                ...properties,
                interval,
                randomDeviation,
            },
        });

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
