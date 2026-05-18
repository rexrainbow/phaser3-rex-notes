import Decorator from '../Decorator';
import { FAILURE, SUCCESS, ERROR } from '../../constants';


class Bypass extends Decorator {
    child: any;


    constructor(
        {
            child = null,
            title,
            name = 'Bypass'
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

        // Won't abort child
        var status = this.child._execute(tick);

        return status;
    }
};

export default Bypass;