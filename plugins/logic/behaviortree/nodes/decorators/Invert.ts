import Decorator from '../Decorator';
import { FAILURE, SUCCESS, ERROR } from '../../constants';


class Invert extends Decorator {
    child: any;

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

    tick(tick?: any) {
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