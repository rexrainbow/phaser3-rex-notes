import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class ForceSuccess extends Decorator {

    constructor(
        {
            child = null,
            name = 'ForceSuccess'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                name,
            },
            nodePool
        );

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