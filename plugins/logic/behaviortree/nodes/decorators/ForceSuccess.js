import Decorator from '../Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../../constants.js';


class ForceSuccess extends Decorator {

    constructor(
        {
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

        return SUCCESS;
    }
};

export default ForceSuccess;