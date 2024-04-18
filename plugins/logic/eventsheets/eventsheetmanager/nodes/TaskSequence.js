import { Sequence, SUCCESS, FAILURE } from '../../../behaviortree';

class TaskSequence extends Sequence {
    open(tick) {
        super.open(tick);

        var blackboard = tick.blackboard;
        var eventSheetManager = blackboard.eventSheetManager;
        var eventsheet = tick.tree;
        var eventSheetGroup = eventsheet.eventSheetGroup;
        eventSheetManager.emit('label.enter', this.title, eventsheet.title, eventSheetGroup.name, eventSheetManager);

    }

    tick(tick) {
        var status = super.tick(tick);
        // Turn FAILURE by SUCCESS
        if (status === FAILURE) {
            status = SUCCESS;
        }
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

export default TaskSequence;