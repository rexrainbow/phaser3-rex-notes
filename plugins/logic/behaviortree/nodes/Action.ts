import BaseNode from './BaseNode';
import { ACTION } from '../constants';

class Action extends BaseNode {
    services: any;
    tick: any;


    constructor(
        {
            name = 'Action',
            title,
            properties,
            services,
        } = {},
        nodePool
    ) {

        super({
            category: ACTION,
            name,
            title,
            properties,
        });

        if (services?: any) {
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

};

export default Action;