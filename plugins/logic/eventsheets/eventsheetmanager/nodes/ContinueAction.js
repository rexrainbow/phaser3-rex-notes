import {
    Action,
    SUCCESS, ABORT
} from '../../../behaviortree/index.js';
import ContinueDecorator from './ContinueDecorator.js';

class ContinueAction extends Action {
    constructor({
        services,
        title,
        name = 'Continue'
    } = {}) {

        super({
            name,
            title,
            services,
        });
    }

    tick(tick) {
        // Find nearest ContinueDecorator
        var parent = this.getParent();
        while (true) {
            if (parent instanceof ContinueDecorator) {
                break;
            }
            if (!parent.getParent) {
                parent = null;
                break;
            }
            parent = parent.getParent();
        }

        var status;
        if (parent) {
            parent.setContinueFlag();
            status = ABORT;
        } else {
            // Can't get responded ContinueDecorator, ignore this continue action node.
            console.error(`[EventSheet] Can't get responded ContinueDecorator, ignore this continue action node.`);
            status = SUCCESS;
        }

        return status;
    }
}

export default ContinueAction;