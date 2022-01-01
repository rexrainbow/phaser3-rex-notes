import Composite from '../core/Composite.js';
import { SUCCESS, RUNNING } from '../constants.js';

class MemSequence extends Composite {

    constructor({ children = [] } = {}) {
        super({
            name: 'MemSequence',
            children
        });
    }

    open(tick) {
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    }

    tick(tick) {
        var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
        for (var i = child; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== SUCCESS) {
                if (status === RUNNING) {
                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                }
                return status;
            }
        }

        return SUCCESS;
    }
};

export default MemSequence;