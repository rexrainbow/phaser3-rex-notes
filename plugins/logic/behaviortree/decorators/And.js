import CompositeDecorator from './CompositeDecorator.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../constants.js';

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
        if (!this.child || !this.subDecorators.length) {
            return ERROR;
        }

        for (var i = 0, cnt = this.subDecorators.length; i < cnt; i++) {
            var status = this.subDecorators[i]._execute(tick);
            
            if ((status === FAILURE) || (status === RUNNING)) {
                // Any condition returns FAILURE, or RUNNING
                return status;
            }
        }

        // All conditions return SUCCESS, tick child
        return this.child._execute(tick);
    }
};

export default And;