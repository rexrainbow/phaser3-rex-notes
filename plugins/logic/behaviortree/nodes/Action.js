import BaseNode from './BaseNode.js';
import { ACTION } from '../constants.js';

class Action extends BaseNode {

    constructor(
        {
            name = 'Action',
            title,
            properties
        } = {}
    ) {

        super({
            category: ACTION,
            name,
            title,
            properties,
        });
    }

};

export default Action;
