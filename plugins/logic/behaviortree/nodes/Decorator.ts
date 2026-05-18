import BaseNode from './BaseNode';
import { DECORATOR } from '../constants';

class Decorator extends BaseNode {
    child: any;


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
        if (child?: any) {
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

    addChild(node?: any, nodePool?: any) {
        if (typeof (node) === 'string') {  // Node ID
            node = nodePool[node];
        }

        this.child = node;
        node.setParent(this);
        return this;
    }

    chainChild(node?: any, nodePool?: any) {
        // Get last decorator
        var decorator = this;
        while (decorator.child instanceof Decorator) {
            decorator = decorator.child;
        }
        decorator.addChild(node, nodePool);
        return this;
    }

    isChildRunning(tick?: any) {
        return this.child.getOpenState(tick);
    }

    abortChildren(tick?: any) {
        if (this.isChildRunning(tick)) {
            this.child._abort(tick);
        }
    }

    openChild(tick?: any) {
        this.child.setOpenState(tick, true);
        return this;
    }
};

export default Decorator;