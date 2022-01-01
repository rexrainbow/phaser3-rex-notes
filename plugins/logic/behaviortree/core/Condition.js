import BaseNode from './BaseNode.js';
import { CONDITION } from '../constants.js';

class Condition extends BaseNode {

    constructor({ name = 'Condition', title, properties } = {}) {
        super({
            category: CONDITION,
            name,
            title,
            properties,
        });
    }

};

export default Condition;
