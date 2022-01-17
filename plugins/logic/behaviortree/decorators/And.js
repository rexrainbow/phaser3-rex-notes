import CompositeDecorator from './CompositeDecorator.js';
import { FAILURE, SUCCESS, ERROR } from '../constants.js';

class And extends CompositeDecorator {

    constructor({
        subDecorators = [],
        child = null,
        name = 'And'
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
            if (subDecorators[i].tick(tick) === FAILURE) {
                return FAILURE;
            }
        }
        return this.child._execute(tick);
    }
};

export default And;