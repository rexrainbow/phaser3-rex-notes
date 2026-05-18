import Decorator from '../Decorator';
import { FAILURE, SUCCESS, RUNNING, ABORT, ERROR } from '../../constants';


class ForceFailure extends Decorator {
    child: any;


    constructor(
        {
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
                },
            },
            nodePool
        );

    }

    tick(tick?: any) {
        if (!this.child) {
            return ERROR;
        }

        var status = this.child._execute(tick);

        if (status === SUCCESS) {
            return FAILURE;
        }

        return status;
    }
};

export default ForceFailure;