import EE from '../../utils/eventemitter/EventEmitter.js';
import Methods from './Methods.js';
import GetObjUID from '../graphitem/GetObjUID.js';

class Graph extends EE {
    constructor(scene) {
        super();

        this.scene = scene;
        this.vertices = {}; // {vertex: {edge:vertexUidB, ...} }
        this.edges = {}; // {edge: {vA:vertex, vB:vertex, dir:1,2,3} }
        this.vertexCount = 0;
        this.edgeCount = 0;

        this.boot();
    }

    boot() {
        if (this.scene) {
            this.scene.events.once('shutdown', this.destroy, this);
        }
    }

    shutdown() {
        this.clear();
        super.shutdown();

        this.scene = undefined;
        this.vertices = undefined;
        this.edges = undefined;
        this.vertexCount = 0;
        this.edgeCount = 0;
        return this;
    }

    destroy() {
        this.emit('destroy');
        this.shutdown();
        return this;
    }

    exists(gameObject) {
        return this.isEdge(gameObject) || this.isVertex(gameObject);
    }

    remove(gameObject) {
        if (this.isEdge(gameObject)) {
            this.removeEdge(gameObject);
        } else if (this.isVertex(gameObject)) {
            this.removeVertex(gameObject);
        }
        return this;
    }

    clear(destroy) {
        if (destroy === undefined) {
            destroy = true;
        }
        this.removeAllVertices(destroy);
        return this;
    }

    getObjUID(gameObject) {
        return GetObjUID(gameObject);
    }
}

Object.assign(
    Graph.prototype,
    Methods
);

export default Graph;