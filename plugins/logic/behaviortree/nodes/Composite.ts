import BaseNode from './BaseNode';
import { COMPOSITE } from '../constants';

class Composite extends BaseNode {
    children: any;

    services: any;
    tick: any;


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

        if (services?: any) {
            for (var i = 0, cnt = services.length; i < cnt; i++) {
                this.addService(services[i], nodePool);
            }
        }
    }

    destroy() {
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            this.children[i].destroy();
        }

        if (this.services) {
            for (var i = 0, cnt = this.services.length; i < cnt; i++) {
                this.services[i].destroy();
            }
        }

        this.children = undefined;
        this.services = undefined;

        super.destroy();
    }

    insertChild(node?: any, nodePool?: any, index?: any) {
        if (typeof (node) === 'string') {  // Node ID
            node = nodePool[node];
        }

        if (this.children.indexOf(node) === -1) {
            if (index < 0) {
                index = this.children.length + index;
            }
            if ((index === undefined) || (index >= this.children.length)) {
                this.children.push(node);
            } else {
                this.children.splice(index, 0, node);
            }

            node.setParent(this);
        }

        return this;
    }

    addChild(node?: any, nodePool?: any,) {
        this.insertChild(node, nodePool);
        return this;
    }

    addService(node?: any, nodePool?: any) {
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

    _tick(tick?: any) {
        tick._tickNode(this);

        if (this.services) {
            for (var i = 0, cnt = this.services.length; i < cnt; i++) {
                this.services[i]._tick(tick);
            }
        }

        return this.tick(tick);
    }

    abortChildren(tick?: any) {
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            var childNode = this.children[i];
            if (childNode.getOpenState(tick)) {
                childNode._abort(tick);
            }
        }
    }

};

export default Composite;