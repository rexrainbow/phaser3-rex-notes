import Composite from '../core/Nodes/Composite.js';
import { SUCCESS, RUNNING } from '../constants.js';

class Sequence extends Composite {
    constructor({
        children = [],
        name = 'Sequence'
    } = {}) {

        super({
            children,
            name,
        });
    }

    open(tick) {
        tick.blackboard.set('$runningChild', 0, tick.tree.id, this.id);
    }

    tick(tick) {
        var childIndex = tick.blackboard.get('$runningChild', tick.tree.id, this.id);
        for (var i = childIndex, cnt = this.children.length; i < cnt; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== SUCCESS) {
                if (status === RUNNING) {
                    tick.blackboard.set('$runningChild', i, tick.tree.id, this.id);
                }
                return status;
            }
        }

        return SUCCESS;
    }
};

export default Sequence;