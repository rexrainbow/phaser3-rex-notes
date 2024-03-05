import { BehaviorTree, IfSelector } from '../../../behaviortree';

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
        return (nodeMemory.$runningChild === 0);
    }

    setConditionEnable(enable = true) {
        var selectChildIndex = (enable) ? undefined : 0;
        this.root.setSelectChildIndex(selectChildIndex);
        return this;
    }
}

export default EventBehaviorTree;