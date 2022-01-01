import Composite from '../core/Composite.js';
import { SUCCESS } from '../constants.js';

class Sequence extends Composite {

    constructor({ children = [] } = {}) {
        super({
            name: 'Sequence',
            children
        });
    }

    tick(tick) {
        for (var i = 0; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== SUCCESS) {
                return status;
            }
        }

        return SUCCESS;
    }
};

export default Sequence;
