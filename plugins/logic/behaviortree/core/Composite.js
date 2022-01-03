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
