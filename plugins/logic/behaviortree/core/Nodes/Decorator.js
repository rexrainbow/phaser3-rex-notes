import BaseNode from './BaseNode.js';
import { DECORATOR } from '../../constants.js';

class Decorator extends BaseNode {

    constructor({ child = null, name = 'Decorator', title, properties } = {}) {
        super({
            category: DECORATOR,
            name,
            title,
            properties,
        });

        this.child = null;
        if (child) {
            this.addChild(child);
        }
    }

    addChild(node) {
        this.child = node;
        node.setParent(this);
        return this;
    }

    getChildren(out) {
        super.getChildren(out);

        if (this.child) {
            this.child.getChildren(out);
        }
        return out;
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