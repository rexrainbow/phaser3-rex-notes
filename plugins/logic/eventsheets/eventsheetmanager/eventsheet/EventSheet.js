import { BehaviorTree, IfSelector, IDLE, RUNNING } from '../../../behaviortree/index.js';

const RoundIdle = 0;
const RoundRun = 1;
const RoundComplete = 2;

const PropertyTable = {
    'groupName': { defaultValue: '_', rewritable: true },
    'parallel': { defaultValue: false, rewritable: true },
    'active': { defaultValue: true, rewritable: true },
    'once': { defaultValue: false, rewritable: true },
    'roundState': { defaultValue: RoundIdle, rewritable: false },
    'conditionPassed': { defaultValue: undefined, rewritable: false },
}

class EventSheet extends BehaviorTree {
    constructor(eventSheetManager, config) {
        if (config === undefined) {
            config = {};
        }

        var { condition = true } = config;
        delete config.condition;

        var properties = config.properties;
        delete config.properties;

        super(config);

        // Store default properties
        for (var propertyKey in PropertyTable) {
            var { defaultValue, rewritable } = PropertyTable[propertyKey];

            this.wrapProperty(propertyKey);

            if (rewritable) {
                if (propertyKey in properties) {
                    this[propertyKey] = properties[propertyKey];
                    delete properties[propertyKey];
                } else {
                    this[propertyKey] = defaultValue;
                }
            } else {
                this[propertyKey] = defaultValue;
            }

        }

        // Store custom properties
        for (var propertyKey in properties) {
            this.wrapProperty(propertyKey);
            this[propertyKey] = properties[propertyKey];
        }

        // Store references
        var groupName = this.groupName;
        this.eventSheetManager = eventSheetManager;
        this.blackboard = eventSheetManager.blackboard;
        this.setTreeGroup(groupName);

        var root = new IfSelector({
            title: this.title,
            expression: condition,
            conditionEvalBreak: true   // Return RUNNING instead of SUCCESS for condition eval
        })
        this.setRoot(root);
    }

    wrapProperty(key) {
        var treeProperties = this.properties;
        Object.defineProperty(this, key, {
            get() {
                return treeProperties[key];
            },
            set(newValue) {
                treeProperties[key] = newValue;
            },
            enumerable: true,
            configurable: true,
        });

        return this;
    }

    setTreeGroup(groupName) {
        this.groupName = groupName;
        this.eventSheetGroup = this.eventSheetManager.getTreeGroup(groupName);
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

export default EventSheet;