import BaseNode from './BaseNode';
import { SERVICE } from '../constants';

class Service extends BaseNode {
    addExpression: any;
    getNodeMemory: any;
    intervalExpression: any;
    randomDeviationExpression: any;
    tick: any;


    constructor(
        {
            interval = 0,
            randomDeviation = 0,
            name = 'Service',
            title,
            properties
        } = {}
    ) {

        if (properties === undefined) {
            properties = {};
        }

        properties.interval = interval;
        properties.randomDeviation = randomDeviation;

        super({
            category: SERVICE,
            name,
            title,
            properties,
        });

        this.intervalExpression = this.addExpression(interval);
        this.randomDeviationExpression = this.addExpression(randomDeviation);

    }

    _tick(tick?: any) {
        if (this.canTick(tick)) {
            this.tick(tick);
        }
    }

    canTick(tick?: any) {
        var nodeMemory = this.getNodeMemory(tick);
        var currTime = tick.currentTime;
        var lastEndTime = nodeMemory.$lastEndTime;
        var interval = nodeMemory.$interval;

        var canTick = (lastEndTime === undefined) ||
            ((currTime - lastEndTime) >= interval);

        if (canTick?: any) {
            nodeMemory.$lastEndTime = currTime;

            var interval = tick.evalExpression(this.intervalExpression);
            var randomDeviation = tick.evalExpression(this.randomDeviationExpression);
            if (randomDeviation > 0) {
                interval += (0.5 - Math.random()) * randomDeviation;
            }
            nodeMemory.$interval = interval;
        }

        return canTick;
    }

};

export default Service;