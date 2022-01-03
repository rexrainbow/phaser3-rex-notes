import CreateUUID from '../../utils/CreateUUID.js';
import Load from './Load.js';
import Dump from './Dump.js';
import Tick from '../Tick.js';

class BehaviorTree {

    constructor() {

        this.id = CreateUUID();

        this.title = '';

        this.description = '';

        this.properties = {};

        this.root = null;

        this.debug = null;
    }

    tick(target, blackboard) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an ' +
            'instance of b3.Blackboard';
        }

        /* CREATE A TICK OBJECT */
        var tick = new Tick();
        tick.debug = this.debug;
        tick.target = target;
        tick.blackboard = blackboard;
        tick.tree = this;

        /* TICK NODE */
        var state = this.root._execute(tick);

        /* CLOSE NODES FROM LAST TICK, IF NEEDED */
        var lastOpenNodes = blackboard.get('openNodes', this.id);
        var currOpenNodes = tick._openNodes.slice(0);

        // does not close if it is still open in this tick
        var start = 0;
        var i;
        for (i = 0; i < Math.min(lastOpenNodes.length, currOpenNodes.length); i++) {
            start = i + 1;
            if (lastOpenNodes[i] !== currOpenNodes[i]) {
                break;
            }
        }

        // close the nodes
        for (i = lastOpenNodes.length - 1; i >= start; i--) {
            lastOpenNodes[i]._close(tick);
        }

        /* POPULATE BLACKBOARD */
        blackboard.set('openNodes', currOpenNodes, this.id);
        blackboard.set('nodeCount', tick._nodeCount, this.id);

        return state;
    }
};

var Methods = {
    load: Load,
    dump: Dump,
}
Object.assign(
    BehaviorTree.prototype,
    Methods
);

export default BehaviorTree;