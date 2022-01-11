import Decorator from '../core/Nodes/Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../constants.js';


class Inverter extends Decorator {
    constructor({
        child = null,
        name = 'Inverter'
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

        if (status == SUCCESS) {
            status = FAILURE;
        } else if (status == FAILURE) {
            status = SUCCESS;
        }

        return status;
    }
};

export default Inverter;