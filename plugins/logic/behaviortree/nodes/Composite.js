import BaseNode from './BaseNode.js';
import { COMPOSITE } from '../constants.js';

class Composite extends BaseNode {

    constructor(
        {
            children = [],
            name = 'Composite',
            title,
            properties
        } = {},
        nodePool
    ) {

        super({
            category: COMPOSITE,
            name,
            title,
            properties,
        });

        this.children = [];
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            this.addChild(children[i], nodePool);
        }
    }

    addChild(node, nodePool) {
        if (typeof (node) === 'string') {  // Node ID
            node = nodePool[node];
        }

        if (this.children.indexOf(node) === -1) {
            this.children.push(node);
            node.setParent(this);
        }

        return this;
    }

    _close(tick) {
        super._close(tick);

        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            var childNode = this.children[i];
            if (childNode.getOpenState(tick)) {
                childNode._close(tick);
            }
        }
    }

};

export default Composite;
