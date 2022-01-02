import BaseNode from './BaseNode.js';
import { COMPOSITE } from '../constants.js';

class Composite extends BaseNode {

    constructor({ children = [], name = 'Composite', title, properties } = {}) {
        super({
            category: COMPOSITE,
            name,
            title,
            properties,
        });
        this.children = children.slice(0);
    }

};

export default Composite;
