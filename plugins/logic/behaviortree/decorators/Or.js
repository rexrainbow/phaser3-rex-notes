import CompositeDecorator from './CompositeDecorator.js';
import { FAILURE, SUCCESS, ERROR } from '../constants.js';

class Or extends CompositeDecorator {

    constructor({
        subDecorators = [],
        child = null,
        name = 'Or'
    } = {}) {

        super({
            subDecorators,
            child,
            name,
        });
    }

    tick(tick) {
        var subDecorators = this.subDecorators;
        if (!this.child || !this.subDecorators.length) {
            return ERROR;
        }

        for (var i = 0, cnt = subDecorators.length; i < cnt; i++) {
            if (subDecorators[i].tick(tick) === SUCCESS) {
                return this.child._execute(tick);
            }
        }
        return FAILURE;
    }
};

export default Or;