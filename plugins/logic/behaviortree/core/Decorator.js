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

    _close(tick) {
        super._close(tick);

        var childNode = this.child;
        if (childNode.getOpenState(tick)) {
            childNode._close(tick);
        }
    }
};

export default Decorator;