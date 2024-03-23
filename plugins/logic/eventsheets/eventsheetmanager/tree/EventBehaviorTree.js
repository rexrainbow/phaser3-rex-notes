import { BehaviorTree, IfSelector, IDLE, RUNNING } from '../../../behaviortree/index.js';
import GetValue from '../../../../utils/object/GetFastValue.js';

const RoundIdle = 0;
const RoundRun = 1;
const RoundComplete = 2;

const PropertyTable = [
    ['parallel', false, true],             // Readonly
    ['active', true, true],                // Readonly
    ['once', false, true],
    ['roundState', RoundIdle, false],      // Internal
    ['conditionPassed', undefined, false], // Internal
]

class EventBehaviorTree extends BehaviorTree {
    constructor(treeManager, config) {
        if (config === undefined) {
            config = {};
        }

        var { groupName } = config;
        delete config.groupName;

        var { condition = true } = config;
        delete config.condition;

        var properties = config.properties;
        delete config.properties;

        super(config);

        // Store properties
        for (var i = 0, cnt = PropertyTable.length; i < cnt; i++) {
            var [propertyKey, defaultValue, rewritable] = PropertyTable[i];
            WrapProperty(this, propertyKey);
            this[propertyKey] = (rewritable) ? GetValue(properties, propertyKey, defaultValue) : defaultValue;
        }

        // Store references
        this.treeManager = treeManager;
        this.blackboard = treeManager.blackboard;
        this.setTreeGroup(groupName);

        var root = new IfSelector({
            title: this.title,
            expression: condition,
            conditionEvalBreak: true   // Return RUNNING instead of SUCCESS for condition eval
        })
        this.setRoot(root);
    }

    setTreeGroup(groupName) {
        this.groupName = groupName;
        this.treeGroup = this.treeManager.getTreeGroup(groupName);
        return this;
    }

    setActive(active) {
        if (active === undefined) {
            active = true;
        }
        this.active = active;
        return this;
    }

    get roundComplete() {
        return this.roundState === RoundComplete;
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
            this.conditionPassed = (nodeMemory.$runningChild === 0);
        }

        return true;
    }

    tick(blackboard, target) {
        var state = super.tick(blackboard, target);

        if (state !== RUNNING) {
            // Will remove from pendingTrees
            this.roundState = RoundComplete;

            if (this.conditionPassed && this.properties.once) {
                this.setActive(false);
            }
        }

        return state;
    }

    abort(blackboard, target) {
        this.roundState = RoundIdle;

        super.abort(blackboard, target);
    }
}

var WrapProperty = function (tree, key) {
    var treeProperties = tree.properties;
    Object.defineProperty(tree, key, {
        get() {
            return treeProperties[key];
        },
        set(newValue) {
            treeProperties[key] = newValue;
        },
        enumerable: true,
        configurable: true,
    });
}

export default EventBehaviorTree;