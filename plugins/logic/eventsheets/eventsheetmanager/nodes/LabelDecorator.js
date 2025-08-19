import {
    Decorator,
    SUCCESS, FAILURE
} from '../../../behaviortree/index.js';

class LabelDecorator extends Decorator {
    constructor(
        {
            child = null,
            title,
            name = 'Label'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
            },
            nodePool
        );
    }

    open(tick) {
        super.open(tick);

        var blackboard = tick.blackboard;
        var eventSheetManager = blackboard.eventSheetManager;
        var eventsheet = tick.tree;
        var eventSheetGroup = eventsheet.eventSheetGroup;
        eventSheetManager.emit('label.enter', this.title, eventsheet.title, eventSheetGroup.name, eventSheetManager);

    }

    tick(tick) {
        if (!this.child) {
            return SUCCESS;
        }

        // Bypass
        var status = this.child._execute(tick);

        return status;
    }

    close(tick) {
        super.close(tick);

        var blackboard = tick.blackboard;
        var eventSheetManager = blackboard.eventSheetManager;
        var eventsheet = tick.tree;
        var eventSheetGroup = eventsheet.eventSheetGroup;
        eventSheetManager.emit('label.exit', this.title, eventsheet.title, eventSheetGroup.name, eventSheetManager);
    }
}

export default LabelDecorator;