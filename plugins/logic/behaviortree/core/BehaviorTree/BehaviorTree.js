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
    }

    tick(target, blackboard) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an instance of Blackboard';
        }

        /* CREATE A TICK OBJECT */
        var tick = new Tick();
        tick.target = target;
        tick.blackboard = blackboard;
        tick.tree = this;
        tick.reset();

        /* TICK NODE */
        var state = this.root._execute(tick);

        /* POPULATE BLACKBOARD */
        blackboard.set('openNodes', tick._openNodes.slice(0), this.id);
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