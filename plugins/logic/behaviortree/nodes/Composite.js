import BaseNode from './BaseNode.js';
import { COMPOSITE } from '../constants.js';

class Composite extends BaseNode {

    constructor(
        {
            children = [],
            name = 'Composite',
            title,
            properties,
            services,
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

        if (services) {
            for (var i = 0, cnt = services.length; i < cnt; i++) {
                this.addService(services[i], nodePool);
            }
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


    addService(node, nodePool) {
        if (typeof (node) === 'string') {  // Node ID
            node = nodePool[node];
        }

        if (this.services === undefined) {
            this.services = [];
        }

        if (this.services.indexOf(node) === -1) {
            this.services.push(node);
            node.setParent(this);
        }

        return this;
    }

    _tick(tick) {
        tick._tickNode(this);

        if (this.services) {
            for (var i = 0, cnt = this.services.length; i < cnt; i++) {
                this.services[i]._tick(tick);
            }
        }

        return this.tick(tick);
    }

    abortChildren(tick) {
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            var childNode = this.children[i];
            if (childNode.getOpenState(tick)) {
                childNode._abort(tick);
            }
        }
    }

};

export default Composite;
