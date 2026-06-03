import BaseNode from './BaseNode.js';
import { EXPRESSION } from '../constants.js';

class Expression extends BaseNode {

    constructor(
        {
            name = 'Expression',
            title,
            properties,
        } = {},
        nodePool
    ) {

        super({
            category: EXPRESSION,
            name,
            title,
            properties,
        });
    }

    eval(tick) {
        return 0;
    }

};

export default Expression;
