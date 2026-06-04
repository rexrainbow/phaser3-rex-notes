import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class Invert extends Decorator {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {
            var {
                child = null,
                title,
                properties,
                name = 'Invert'
            } = config;

            super(
                {
                    child,
                    title,
                    properties,
                    name,
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

        if (status === SUCCESS) {
            status = FAILURE;
        } else if (status === FAILURE) {
            status = SUCCESS;
        }

        return status;
    }
};

export default Invert;
