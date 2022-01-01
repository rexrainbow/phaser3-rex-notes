import Composite from '../core/Composite.js';
import { FAILURE } from '../constants.js';

class Selector extends Composite {

    constructor({ children = [] } = {}) {
        super({
            name: 'Selector',
            children
        });
    }

    tick(tick) {
        for (var i = 0; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== FAILURE) {
                return status;
            }
        }

        return FAILURE;
    }
};

export default Selector;
