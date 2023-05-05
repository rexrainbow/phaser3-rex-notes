import { BehaviorTree } from '../../behaviortree';

class EventBehaviorTree extends BehaviorTree {
    setParallel(parallel = true) {
        this.properties.parallel = parallel;
        return this;
    }
}

export default EventBehaviorTree;