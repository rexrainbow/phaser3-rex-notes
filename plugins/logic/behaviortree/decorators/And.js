import CompositeDecorator from './CompositeDecorator.js';
import  { SUCCESS, FAILURE, RUNNING, ERROR } from '../constants.js';

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

        var nodeMemory = tick.getNodeMemory();

        var subDecoratorIndex = nodeMemory.$runningSubDecorator;
        for (var i = subDecoratorIndex, cnt = this.subDecorators.length; i < cnt; i++) {
            var status = this.subDecorators[i]._execute(tick);
            
            if (status === RUNNING) {
                nodeMemory.$runningSubDecorator = i;
                return RUNNING;
            } else if (status === FAILURE) {
                return FAILURE;
            }

        }

        // SUCCESS, tick child
        return this.child._execute(tick);
    }
};

export default And;