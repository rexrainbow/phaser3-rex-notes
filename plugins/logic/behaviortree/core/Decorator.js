import BaseNode from './BaseNode.js';
import { DECORATOR } from '../constants.js';

class Decorator extends BaseNode {

    constructor({ child = null, name = 'Decorator', title, properties } = {}) {
        super({
            category: DECORATOR,
            name,
            title,
            properties,
        });
        this.child = child;
    }

};

export default Decorator;