import Decorator from '../core/Nodes/Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../constants.js';


class Invert extends Decorator {
    constructor({
        child = null,
        name = 'Invert'
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

        if (status === SUCCESS) {
            status = FAILURE;
        } else if (status === FAILURE) {
            status = SUCCESS;
        }
        // Bypass RUNNING status

        return status;
    }
};

export default Invert;