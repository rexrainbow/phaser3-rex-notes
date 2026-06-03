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

    eval(tick) {
        return 0;
    }

};

export default Expression;
