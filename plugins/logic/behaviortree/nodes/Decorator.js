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

    addChild(node, nodePool) {
        if (typeof (node) === 'string') {  // Node ID
            node = nodePool[node];
        }

        this.child = node;
        node.setParent(this);
        return this;
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