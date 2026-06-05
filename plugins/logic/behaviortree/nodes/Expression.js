import BaseNode from './BaseNode.js';
import { EXPRESSION } from '../constants.js';

class Expression extends BaseNode {

    constructor(
        {
            id,
            name = 'Expression',
            title,
            description,
            properties,
        } = {},
        nodePool
    ) {

        super({
            id,
            category: EXPRESSION,
            name,
            title,
            description,
            properties,
        });
    }

    _eval(tick) {
        var value = this.eval(tick);

        var nodeMemory = this.getNodeMemory(tick);
        nodeMemory.$lastValue = value;  // For inspector

        return value;
    }

    eval(tick) {
        return 0;
    }

    getLastValue(tick) {
        var nodeMemory = this.getNodeMemory(tick);
        return nodeMemory.$lastValue;
    }

};

export default Expression;
