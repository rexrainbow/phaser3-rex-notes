import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR, RUNNING } from '../../constants.js';


class ForceFailure extends Decorator {

    constructor(
        {
            returnRunning = true,
            child = null,
            title,
            name = 'ForceFailure'
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

        this.returnRunning = returnRunning;

    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        // Won't abort child
        var status = this.child._execute(tick);

        if (this.returnRunning && (status === RUNNING)) {
            return RUNNING;
        }
        return FAILURE;
    }
};

export default ForceFailure;