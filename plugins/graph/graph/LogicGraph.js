import EE from '../../utils/eventemitter/EventEmitter.js';
import Methods from './methods/Methods.js';
import GraphData from 'graphology';

class LogicGraph extends EE {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // scene: scene instance, or undefined
        super();

        this.isShutdown = false;
        this.scene = scene;
        this.graph = new GraphData();

        this.boot();
    }

    boot() {
        if (this.scene) {
            this.scene.sys.events.once('shutdown', this.destroy, this);
        }
    }

    shutdown(fromScene) {
        if (this.isShutdown) {
            return;
        }

        if (this.scene) {
            this.scene.sys.events.off('shutdown', this.destroy, this);
        }

        this.clear();
        super.shutdown();

        this.scene = null;
        this.isShutdown = true;
        return this;
    }

    destroy(fromScene) {
        if (this.isShutdown) {
            return;
        }

        this.emit('destroy');
        this.shutdown(fromScene);
    }

    get nodeCount() {
        return this.graph.order;
    }

    get edgeCount() {
        return this.graph.size;
    }

    exists(gameObject) {
        return this.isEdge(gameObject) || this.isNode(gameObject);
    }

    remove(gameObject, destroy) {
        if (destroy === undefined) {
            destroy = false;
        }
        if (this.isNode(gameObject)) {
            this.removeNode(gameObject, destroy);
        } else if (this.isEdge(gameObject)) {
            this.removeEdge(gameObject, destroy);
        }
        return this;
    }

    setAttribute(gameObject, key, value) {
        if (this.isNode(gameObject)) {
            this.setNodeAttribute(gameObject, key, value);
        } else if (this.isEdge(gameObject)) {
            this.setEdgeAttribute(gameObject, key, value);
        }
        return this;
    }

    getAttribute(gameObject, key) {
        if (this.isNode(gameObject)) {
            this.getNodeAttribute(gameObject, key);
        } else if (this.isEdge(gameObject)) {
            this.getEdgeAttribute(gameObject, key);
        }
        return this;
    }

    clear(destroy) {
        if (destroy === undefined) {
            destroy = true;
        }
        this.removeAllNodes(destroy);
        return this;
    }
}

Object.assign(
    LogicGraph.prototype,
    Methods
);

export default LogicGraph;