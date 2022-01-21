import CompositeDecorator from './CompositeDecorator.js';
import { SUCCESS, FAILURE, RUNNING, ERROR } from '../constants.js';

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
        if (!this.child || !this.subDecorators.length) {
            return ERROR;
        }

        var anyRunningFlag = false;
        for (var i = 0, cnt = this.subDecorators.length; i < cnt; i++) {
            var status = this.subDecorators[i]._execute(tick);

            if (status === SUCCESS) {
                // Any condition return SUCCESS, tick child 
                return this.child._execute(tick);

            } else if (status === RUNNING) {
                // Any condition return RUNNING, set anyRunningFlag
                anyRunningFlag = true;
            }
        }

        return (anyRunningFlag) ? RUNNING : FAILURE;
    }
};

export default Or;