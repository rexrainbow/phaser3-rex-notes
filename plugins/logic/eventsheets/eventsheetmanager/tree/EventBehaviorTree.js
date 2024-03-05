import { BehaviorTree, IfSelector, IDLE } from '../../../behaviortree';

class EventBehaviorTree extends BehaviorTree {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }
        super(config);

        var { parallel = false } = config
        this.properties.parallel = parallel;

        var { condition = 'true' } = config;
        var root = new IfSelector({
            title: this.title,
            expression: condition,
            conditionEvalBreak: true   // Return RUNNING instead of SUCCESS for condition eval
        })
        this.setRoot(root);
    }

    get isParallel() {
        return this.properties.parallel;
    }

    get conditionEvalPassed() {
        var nodeMemory = this.root.getNodeMemory(this.ticker);
        return nodeMemory.conditionEvalPassed;
    }

    setConditionEnable(enable = true) {
        var selectChildIndex = (enable) ? undefined : 0;
        this.root.setSelectChildIndex(selectChildIndex);
        return this;
    }

    tick(blackboard, target) {
        var isIdleState = blackboard.getTreeState(this.id) == IDLE;

        var state = super.tick(blackboard, target);

        if (isIdleState) {
            // Run *if* part (pass), or *catch* part (failled)
            var nodeMemory = this.root.getNodeMemory(this.ticker);
            nodeMemory.conditionEvalPassed = (nodeMemory.$runningChild === 0);
        }

        return state;
    }
}

export default EventBehaviorTree;