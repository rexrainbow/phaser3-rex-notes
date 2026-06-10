import { EVT_CONDITION_EVAL } from '../../constants.js';
import SerializeConditionExpression from './SerializeConditionExpression.js';
import GetConditionType from './GetConditionType.js';

var EmitConditionEval = function (tick, node, condition, result) {
    var blackboard = tick.blackboard;
    if (!blackboard) {
        return;
    }

    var eventSheetManager = blackboard.eventSheetManager;
    if (!eventSheetManager) {
        return;
    }

    var eventSheet = tick.tree;
    var eventSheetGroup = eventSheet.eventSheetGroup;
    var groupName = eventSheetGroup.name;

    node.conditionType = GetConditionType(node);

    eventSheetManager.emit(
        EVT_CONDITION_EVAL,
        SerializeConditionExpression(condition),
        !!result,
        eventSheet.title,
        groupName,
        eventSheetManager,
        eventSheet,
        node,
        eventSheetGroup
    );
}

export default EmitConditionEval;
