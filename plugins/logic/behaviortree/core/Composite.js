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

        this.children = [];
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            this.addChild(children[i]);
        }
    }

    addChild(node) {
        this.children.push(node);
        node.setParent(this);
        return this;
    }

    getChildren(out) {
        super.getChildren(out);

        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            this.children[i].getChildren(out);
        }

        return out;
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
