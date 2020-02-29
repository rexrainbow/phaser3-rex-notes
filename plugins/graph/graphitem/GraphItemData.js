import ObjBank from './ObjBank.js';

const uidKey = ObjBank.uidKey;

class GraphItemData {
    constructor(parent, uid) {
        this.parent = parent;
        ObjBank.add(this, uid); // uid is stored in `this.$uid`
        this.graph = null;
        this.type = undefined;
        this.boot();
    }

    boot() {
        var type = typeof (this.parent);
        if ((type !== 'number') && (type !== 'string') && this.parent.once) {
            this.parent.on('destroy', this.destroy, this);
        }
    }

    destroy() {
        if (this.graph) {
            this.graph.remove(this[uidKey]);
        }
        ObjBank.remove(this[uidKey]);

        this.parent = undefined;
        this.setGraph(null);
    }

    setGraph(graph) {
        this.graph = graph;
        if (!graph) {
            this.setType(undefined);
        }
        return this;
    }

    setType(type) {
        if (typeof (type) === 'string') {
            type = OBJTYPE[type];
        }
        this.type = type;
        return this;
    }

    get isVertex() {
        return ((!!this.graph) && (this.type === 0));
    }

    get isEdge() {
        return ((!!this.graph) && (this.type === 1));
    }
}

var methods = {
};
Object.assign(
    GraphItemData.prototype,
    methods
);

const OBJTYPE = {
    vertex: 0,
    edge: 1,
}
export default GraphItemData;