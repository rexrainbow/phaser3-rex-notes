import { BehaviorTree } from '../../behaviortree';

class EventBehaviorTree extends BehaviorTree {
    setParallel(parallel = true) {
        this.properties.parallel = parallel;
        return this;
    }

    get eventConditionPassed() {
        var nodeMemory = this.root.getNodeMemory(this.ticker);
        return (nodeMemory.$runningChild === 0);
    }
}

export default EventBehaviorTree;