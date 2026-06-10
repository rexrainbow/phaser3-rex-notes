import { If } from '../../../../behaviortree/index.js';
import EmitConditionEval from './EmitConditionEval.js';

class EventSheetIf extends If {
    evalCondition(tick) {
        var result = super.evalCondition(tick);
        EmitConditionEval(tick, this, this.condition, result);
        return result;
    }
}

export default EventSheetIf;
