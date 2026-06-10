import { IfSelector } from '../../../../behaviortree/index.js';
import EmitConditionEval from './EmitConditionEval.js';

class EventSheetIfSelector extends IfSelector {
    evalCondition(tick) {
        if (this.forceSelectChildIndex !== undefined) {
            return this.forceSelectChildIndex;
        }

        var result = tick.evalExpression(this.condition);
        EmitConditionEval(tick, this, this.condition, result);

        return (!!result) ? 0 : 1;
    }
}

export default EventSheetIfSelector;
