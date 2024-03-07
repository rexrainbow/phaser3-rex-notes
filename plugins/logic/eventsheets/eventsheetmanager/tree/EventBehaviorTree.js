import { BehaviorTree, IfSelector, IDLE, RUNNING } from '../../../behaviortree';
import GetValue from '../../../../utils/object/GetValue';

const RoundState = '$roundState';
const ConditionEvalPassed = '$conditionEvalPassed';

const RoundIdle = 0
const RoundRun = 1
const RoundComplete = 2

class EventBehaviorTree extends BehaviorTree {
    constructor(treeManager, config) {
        if (config === undefined) {
            config = {};
        }
        super(config);

        this.treeManager = treeManager;
        this.blackboard = treeManager.blackboard;

        var { parallel = false } = config
        this.properties.parallel = parallel;

        var { condition = 'true' } = config;
        var root = new IfSelector({
            title: this.title,
            expression: condition,
            conditionEvalBreak: true   // Return RUNNING instead of SUCCESS for condition eval
        })
        this.setRoot(root);

        this.conditionEvalPassed = undefined;

        this.roundState = RoundIdle;
    }

    get isParallel() {
        return this.properties.parallel;
    }

    get conditionEvalPassed() {
        return this._conditionEvalPassed;
    }

    set conditionEvalPassed(value) {
        this._conditionEvalPassed = value;
        this.setData(this.blackboard, ConditionEvalPassed, value);
    }

    get roundState() {
        return this._roundState;
    }

    set roundState(value) {
        this._roundState = value;
        this.setData(this.blackboard, RoundState, value);
    }

    get roundComplete() {
        return this._roundState === RoundComplete;
    }

    set roundComplete(value) {
        this.roundState = (value) ? RoundComplete : RoundRun;
    }

    setConditionEnable(enable = true) {
        var selectChildIndex = (enable) ? undefined : 0;
        this.root.setSelectChildIndex(selectChildIndex);
        return this;
    }

    start(blackboard, target) {
        if (this.roundState === RoundRun) {
            return false;
        }

        var startFromTop = (this.getState(blackboard) !== RUNNING);
        if (startFromTop) {
            this.resetState(blackboard);
        }

        this.roundState = RoundRun;

        // First tick, condition-eval
        super.tick(blackboard, target);

        if (startFromTop) {
            var nodeMemory = this.root.getNodeMemory(this.ticker);
            this.conditionEvalPassed = (nodeMemory.$runningChild === 0);
        }

        return true;
    }

    tick(blackboard, target) {
        var state = super.tick(blackboard, target);

        if (state !== RUNNING) {
            // Will remove from pendingTrees
            this.roundState = RoundComplete;
        }

        return state;
    }

    abort(blackboard, target) {
        this.roundState = RoundIdle;

        super.abort(blackboard, target);
    }
}

export default EventBehaviorTree;