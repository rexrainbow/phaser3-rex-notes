import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class Invert extends Decorator {
    constructor(
        {
            child = null,
            title,
            name = 'Invert'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
            },
            nodePool
        );
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // Won't abort child
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