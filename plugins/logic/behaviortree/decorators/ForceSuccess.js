import Decorator from '../core/Nodes/Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../constants.js';


class ForceSuccess extends Decorator {

    constructor({
        child = null,
        name = 'ForceSuccess'
    } = {}) {

        super({
            child,
            name,
        });
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var status = this.child._execute(tick);

        return SUCCESS;
    }
};

export default ForceSuccess;