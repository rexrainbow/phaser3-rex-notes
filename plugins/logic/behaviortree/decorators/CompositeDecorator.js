import Decorator from '../core/Nodes/Decorator.js';
import SuccessAction from '../actions/SuccessAction.js';

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
            subDecorators[i].addChild(new SuccessAction);
        }
        this.subDecorators = subDecorators;
    }
};

export default CompositeDecorator;