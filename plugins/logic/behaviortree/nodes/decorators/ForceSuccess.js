import Decorator from '../Decorator.js';
import { RUNNING, FAILURE, SUCCESS, ERROR } from '../../constants.js';


class ForceSuccess extends Decorator {

    constructor(
        {
            returnRunning = true,
            child = null,
            title,
            name = 'ForceSuccess'
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

        if (this.returnRunning && (status === RUNNING)) {
            return RUNNING;
        }
        return SUCCESS;
    }
};

export default ForceSuccess;