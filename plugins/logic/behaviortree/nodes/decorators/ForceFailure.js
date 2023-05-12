import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, RUNNING, ABORT, ERROR } from '../../constants.js';


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
                properties: {
                    returnRunning,
                },
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

        if (status === ABORT) {
            return ABORT;
        } else if (this.returnRunning && (status === RUNNING)) {
            return RUNNING;
        }

        return FAILURE;
    }
};

export default ForceFailure;