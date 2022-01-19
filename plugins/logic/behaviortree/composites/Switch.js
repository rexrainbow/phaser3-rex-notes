import Composite from '../core/Nodes/Composite.js';
import { SUCCESS, FAILURE, RUNNING } from '../constants.js';

class Switch extends Composite {
    constructor({
        expression = null,
        children = {},
        name = 'Switch'
    } = {}) {

        super({
            children: Object.values(children),
            name,
            properties: {
                expression
            },
        });


        if (!expression) {
            throw 'expression parameter in Switch composite is an obligatory parameter';
        }

        this.expression = this.addBooleanVariable(expression);

        this.childrenMap = children;
    }

    addCase(key, node) {
        this.addChild(node);
        this.childrenMap[key] = node;
        return this;
    }

    tick(tick) {
        var key = tick.evalExpression(this.expression);
        var child = this.childrenMap[key];
        if (!child) {
            child = this.childrenMap['default'];
        }

        if (!child) {
            return FAILURE;
        }

        var status = child._execute(tick);
        return status;
    }
};

export default Switch;