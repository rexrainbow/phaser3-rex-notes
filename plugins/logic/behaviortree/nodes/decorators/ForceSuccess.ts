import Decorator from '../Decorator';
import { RUNNING, FAILURE, SUCCESS, ABORT, ERROR } from '../../constants';


class ForceSuccess extends Decorator {
    child: any;


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

        if (status === FAILURE) {
            return SUCCESS;
        }

        return status;
    }
};

export default ForceSuccess;