import { Sequence, SUCCESS, FAILURE } from '../../../behaviortree';

class TaskSequence extends Sequence {
    open(tick) {
        super.open(tick);

        var blackboard = tick.blackboard;
        var treeManager = blackboard.treeManager;
        var eventsheet = tick.tree;
        var eventSheetGroup = eventsheet.eventSheetGroup;
        treeManager.emit('label.enter', this.title, eventsheet.title, eventSheetGroup.name, treeManager);

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
        var treeManager = blackboard.treeManager;
        var eventsheet = tick.tree;
        var eventSheetGroup = eventsheet.eventSheetGroup;
        treeManager.emit('label.exit', this.title, eventsheet.title, eventSheetGroup.name, treeManager);
    }
}

export default TaskSequence;