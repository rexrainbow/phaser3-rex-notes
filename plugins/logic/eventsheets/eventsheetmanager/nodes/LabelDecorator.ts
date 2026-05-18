import {
    Decorator,
    SUCCESS, FAILURE
} from '../../../behaviortree/index';

class LabelDecorator extends Decorator {
    child: any;

    title: any;

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

    open(tick?: any) {
        super.open(tick);

        var blackboard = tick.blackboard;
        var eventSheetManager = blackboard.eventSheetManager;
        var eventsheet = tick.tree;
        var eventSheetGroup = eventsheet.eventSheetGroup;
        eventSheetManager.emit('label.enter', this.title, eventsheet.title, eventSheetGroup.name, eventSheetManager);

    }

    tick(tick?: any) {
        if (!this.child) {
            return SUCCESS;
        }

        // Bypass
        var status = this.child._execute(tick);

        return status;
    }

    close(tick?: any) {
        super.close(tick);

        var blackboard = tick.blackboard;
        var eventSheetManager = blackboard.eventSheetManager;
        var eventsheet = tick.tree;
        var eventSheetGroup = eventsheet.eventSheetGroup;
        eventSheetManager.emit('label.exit', this.title, eventsheet.title, eventSheetGroup.name, eventSheetManager);
    }
}

export default LabelDecorator;