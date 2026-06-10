import {
    EVT_CONDITION_EVAL
} from '../../eventsheetmanager/constants.js';

export default {
    onConditionEval(expression, result, sheetTitle, groupName, manager, eventSheet, conditionNode, eventSheetGroup) {
        this.addEvent(this.createConditionEvent(EVT_CONDITION_EVAL, expression, result, sheetTitle, groupName, manager, eventSheet, conditionNode, eventSheetGroup), manager, groupName);
    },

}