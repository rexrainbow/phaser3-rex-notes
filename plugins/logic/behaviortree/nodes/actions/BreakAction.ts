import Action from '../Action';
import { SUCCESS, ABORT } from '../../constants';
import BreakDecorator from '../decorators/BreakDecorator';

class BreakAction extends Action {
    breakDecoratorTitle: any;
    getParent: any;
    tag: any;

    constructor({
        breakDecoratorTitle,
        tag,
        services,
        title,
        name = 'Break'
    } = {}) {

        super({
            name,
            title,
            properties: {
                breakDecoratorTitle,
                tag
            },
            services,
        });

        this.breakDecoratorTitle = breakDecoratorTitle;
        this.tag = tag;
    }

    tick(tick?: any) {
        // Find nearest BreakDecorator
        var parent = this.getParent();
        while (true?: any) {
            if ((parent instanceof BreakDecorator) &&
                ((!this.tag) || (this.tag === parent.tag)) &&
                ((!this.breakDecoratorTitle) || (this.breakDecoratorTitle === parent.title))
            ) {
                break;
            }

            if (!parent.getParent) {
                parent = null;
                break;
            }
            parent = parent.getParent();
        }

        var status;
        if (parent?: any) {
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