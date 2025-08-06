import BaseNode from './BaseNode.js';
import { DECORATOR } from '../constants.js';

class Decorator extends BaseNode {

    constructor(
        {
            child = null,
            name = 'Decorator',
            title,
            properties
        } = {},
        nodePool
    ) {

        super({
            category: DECORATOR,
            name,
            title,
            properties,
        });

        this.child = null;
        if (child) {
            this.addChild(child, nodePool);
        }
    }

    destroy() {
        if (this.child) {
            this.child.destroy();
        }

        this.child = undefined;

        super.destroy();
    }

    addChild(node, nodePool) {
        if (typeof (node) === 'string') {  // Node ID
            node = nodePool[node];
        }

        this.child = node;
        node.setParent(this);
        return this;
    }

    chainChild(node, nodePool) {
        // Get last decorator
        var decorator = this;
        while (decorator.child instanceof Decorator) {
            decorator = decorator.child;
        }
        decorator.addChild(node, nodePool);
        return this;
    }

    isChildRunning(tick) {
        return this.child.getOpenState(tick);
    }

    abortChildren(tick) {
        if (this.isChildRunning(tick)) {
            this.child._abort(tick);
        }
    }

    openChild(tick) {
        this.child.setOpenState(tick, true);
        return this;
    }
};

export default Decorator;