import {
    Action,
    SUCCESS, ABORT
} from '../../../behaviortree/index.js';
import BreakDecorator from './BreakDecorator.js';

class BreakAction extends Action {
    constructor({
        breakDecoratorTitle,
        services,
        title,
        name = 'Break'
    } = {}) {

        super({
            name,
            title,
            properties: {
                breakDecoratorTitle
            },
            services,
        });

        this.breakDecoratorTitle = breakDecoratorTitle;
    }

    tick(tick) {
        // Find nearest BreakDecorator
        var parent = this.getParent();
        while (true) {
            if (parent instanceof BreakDecorator) {
                if (
                    !this.breakDecoratorTitle || (this.breakDecoratorTitle === '') ||
                    (this.breakDecoratorTitle === parent.title)
                ) {
                    break;
                }
            }
            if (!parent.getParent) {
                parent = null;
                break;
            }
            parent = parent.getParent();
        }

        var status;
        if (parent) {
            parent.setBreakFlag();
            status = ABORT;
        } else {
            // Can't get responded BreakDecorator, ignore this break action node
            console.error(`[EventSheet] Can't get responded BreakDecorator, ignore this break action node.`);
            status = SUCCESS;
        }

        return status;
    }
}

export default BreakAction;