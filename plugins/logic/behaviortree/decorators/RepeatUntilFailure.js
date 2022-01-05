import Decorator from '../core/Nodes/Decorator.js';
import { SUCCESS, ERROR } from '../constants.js';

class RepeatUntilFailure extends Decorator {

    constructor({ maxLoop = -1, child = null } = {}) {
        super({
            child,
            name: 'RepeatUntilFailure',
            title: 'Repeat Until Failure',
            properties: { maxLoop: -1 },
        });

        this.maxLoop = maxLoop;
    }

    open(tick) {
        tick.blackboard.set('i', 0, tick.tree.id, this.id);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var i = tick.blackboard.get('i', tick.tree.id, this.id);
        var status = ERROR;

        while (this.maxLoop < 0 || i < this.maxLoop) {
            status = this.child._execute(tick);

            if (status == SUCCESS) {
                i++;
            } else {
                break;
            }
        }

        i = tick.blackboard.set('i', i, tick.tree.id, this.id);
        return status;
    }
};

export default RepeatUntilFailure;
