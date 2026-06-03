import BaseNode from './BaseNode.js';
import { ACTION } from '../constants.js';

class Action extends BaseNode {

    constructor(
        {
            id,
            name = 'Action',
            title,
            description,
            properties,
            services,
        } = {},
        nodePool
    ) {

        super({
            id,
            category: ACTION,
            name,
            title,
            description,
            properties,
        });

        if (services) {
            for (var i = 0, cnt = services.length; i < cnt; i++) {
                this.addService(services[i], nodePool);
            }
        }
    }

    destroy() {
        if (this.services) {
            for (var i = 0, cnt = this.services.length; i < cnt; i++) {
                this.services[i].destroy();
            }
        }
        this.services = undefined;

        super.destroy();
    }

    addService(node, nodePool) {
        if (nodePool) {
            if (!nodePool.hasOwnProperty(node)) {
                throw new Error(`BehaviorTree.load: Missing node "${node}" for ${name}'s Service node`);
            }
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

};

export default Action;
