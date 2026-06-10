import {
    Decorator,
    SUCCESS, FAILURE
} from '../../../behaviortree/index.js';
import {
    EVT_LABEL_ENTER,
    EVT_LABEL_EXIT,
} from '../constants.js';

class LabelDecorator extends Decorator {

    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {
            var {
                child = null,
                title,
                properties,
                name = 'Label'
            } = config;
            super(
                {
                    child,
                    title,
                    properties,
                    name,
                },
                nodePool
            );

        }
    }

    open(tick) {
        super.open(tick);

        var blackboard = tick.blackboard;
        var eventSheetManager = blackboard.eventSheetManager;
        var eventsheet = tick.tree;
        var eventSheetGroup = eventsheet.eventSheetGroup;
        eventSheetManager.emit(EVT_LABEL_ENTER, this.title, eventsheet.title, eventSheetGroup.name, eventSheetManager, eventsheet, this, eventSheetGroup);

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
        eventSheetManager.emit(EVT_LABEL_EXIT, this.title, eventsheet.title, eventSheetGroup.name, eventSheetManager, eventsheet, this, eventSheetGroup);
    }
}

export default LabelDecorator;
