import { Action, ABORT } from '../../../behaviortree/index';

class BreakAction extends Action {
    constructor({
        services,
        title,
        name = 'Break',
    } = {}) {

        super({
            services,
            title,
            name,
        });
    }

    tick(tick) {
        var parentNode = this.getParent(IsBreakTargetNode);
        // Break this level, back to upper level
        if (parentNode) {
            parentNode = parentNode.getParent();
        }

        if (parentNode && parentNode.setContinueOnAbortFlag) {
            parentNode.setContinueOnAbortFlag(true);
        }

        return ABORT;
    }
}

var IsBreakTargetNode = function (node) {
    return node.getProperty('isBreakTarget');
}

export default BreakAction;