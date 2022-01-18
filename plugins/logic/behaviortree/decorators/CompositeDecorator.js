import Decorator from '../core/Nodes/Decorator.js';
import Succeeder from '../actions/Succeeder.js';

class CompositeDecorator extends Decorator {

    constructor({
        subDecorators = [],
        child = null,
        name = 'CompositeDecorator'
    } = {}) {

        super({
            child,
            name,
        });

        for (var i = 0, cnt = subDecorators.length; i < cnt; i++) {
            subDecorators[i].addChild(new Succeeder);
        }
        this.subDecorators = subDecorators;
    }

    open(tick) {
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$runningSubDecorator = 0;
    }
};

export default CompositeDecorator;