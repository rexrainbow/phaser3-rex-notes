import Decorator from '../core/Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../constants.js';

class Limiter extends Decorator {

    constructor({ child = null, maxLoop } = {}) {
        super({
            child,
            name: 'Limiter',
            title: 'Limit <maxLoop> Activations',
            properties: { maxLoop: 1 },
        });

        if (!maxLoop) {
            throw 'maxLoop parameter in Limiter decorator is an obligatory parameter';
        }

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

        if (i < this.maxLoop) {
            var status = this.child._execute(tick);

            if (status == SUCCESS || status == FAILURE) {
                tick.blackboard.set('i', i + 1, tick.tree.id, this.id);
            }

            return status;
        }

        return FAILURE;
    }
};

export default Limiter;