import Decorator from '../Decorator.js';
import { RUNNING, FAILURE, SUCCESS, ABORT, ERROR } from '../../constants.js';


class ForceSuccess extends Decorator {

    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {
            var {
                child = null,
                title,
                name = 'ForceSuccess'
            } = config;

            super(
                {
                    child,
                    title,
                    name,
                    properties: {
                    },
                },
                nodePool
            );

        }
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var status = this.child._execute(tick);

        if (status === FAILURE) {
            return SUCCESS;
        }

        return status;
    }
};

export default ForceSuccess;
