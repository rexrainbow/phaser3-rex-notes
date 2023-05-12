import { Sequence, } from '../../behaviortree';

class TaskSequence extends Sequence {
    open(tick) {
        super.open(tick);

        var treeManager = tick.blackboard.treeManager;
        treeManager.emit('label.enter', this.title, treeManager);

    }

    close(tick) {
        super.close(tick);

        var treeManager = tick.blackboard.treeManager;
        treeManager.emit('label.exit', this.title, treeManager);
    }
}

export default TaskSequence;