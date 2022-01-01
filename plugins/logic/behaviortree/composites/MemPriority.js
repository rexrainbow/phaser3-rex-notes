import Composite from '../core/Composite.js';
import { FAILURE, RUNNING } from '../constants.js';

class MemPriority extends Composite {

    constructor({ children = [] } = {}) {
        super({
            children,
            name: 'MemPriority',
        });
    }

    open(tick) {
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    }

    tick(tick) {
        var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
        for (var i = child; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== FAILURE) {
                if (status === RUNNING) {
                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                }

                return status;
            }
        }

        return FAILURE;
    }
};

export default MemPriority;