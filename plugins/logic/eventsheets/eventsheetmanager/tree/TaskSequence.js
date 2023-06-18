import { Sequence, SUCCESS, FAILURE } from '../../../behaviortree';

class TaskSequence extends Sequence {
    open(tick) {
        super.open(tick);

        var blackboard = tick.blackboard;
        var treeManager = blackboard.treeManager;
        var treeGroup = blackboard.treeGroup;
        treeManager.emit('label.enter', this.title, tick.tree.title, treeGroup.name, treeManager);

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
        var treeGroup = blackboard.treeGroup;
        treeManager.emit('label.exit', this.title, tick.tree.title, treeGroup.name, treeManager);
    }
}

export default TaskSequence;