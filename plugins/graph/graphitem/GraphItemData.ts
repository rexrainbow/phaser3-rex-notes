import ComponentBase from '../../utils/componentbase/ComponentBase';
import ObjBank from './ObjBank';

const uidKey = ObjBank.uidKey;

class GraphItemData extends ComponentBase {
    $uid: any;
    graph: any;
    isShutdown: any;

    constructor(parent?: any, uid?: any) {
        super(parent, { eventEmitter: false });

        ObjBank.add(this, uid); // uid is stored in `this.$uid`
        this.graph = null;
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        if (this.graph) {
            this.graph.remove(this[uidKey]);
        }
        ObjBank.remove(this[uidKey]);
        this.setGraph(null);

        super.shutdown(fromScene);
    }

    setGraph(graph?: any) {
        this.graph = graph;
        return this;
    }

    get isNode() {
        if (this.graph) {
            return this.graph.hasNode(this[uidKey]);
        }
        return false;
    }

    get isEdge() {
        if (this.graph) {
            return this.graph.hasEdge(this[uidKey]);
        }
        return false;
    }
}

var methods = {
};
Object.assign(
    GraphItemData.prototype,
    methods
);

export default GraphItemData;