import { Sequence, } from '../../behaviortree';

class TaskSequence extends Sequence {
    open(tick) {
        super.open(tick);

        var treeManager = tick.blackboard.treeManager;
        treeManager.emit('enter.label', this.title, treeManager);

    }

    close(tick) {
        super.close(tick);

        var treeManager = tick.blackboard.treeManager;
        treeManager.emit('exit.label', this.title, treeManager);
    }
}

export default TaskSequence;