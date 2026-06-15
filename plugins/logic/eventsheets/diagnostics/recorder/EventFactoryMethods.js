import GetManagerID from './GetManagerID.js';
import SerializeValue from './SerializeValue.js';
import SerializeConditionExpression from '../../eventsheetmanager/nodes/condition/SerializeConditionExpression.js';

export default {
    createBaseEvent(type, manager, groupName) {
        return {
            type: type,
            managerID: GetManagerID(manager),
            groupName: groupName,
        };
    },

    createEventSheetEvent(type, sheetTitle, groupName, manager, eventSheet, eventSheetGroup) {
        var event = this.createBaseEvent(type, manager, groupName);
        event.sheetTitle = sheetTitle;

        if (eventSheet && (eventSheet.id !== undefined)) {
            event.sheetID = eventSheet.id;
        }

        if (this.includeReferences) {
            event.manager = manager;
            event.eventSheet = eventSheet;
            event.eventSheetGroup = eventSheetGroup;
        }

        return event;
    },

    createNodeEvent(type, labelTitle, sheetTitle, groupName, manager, eventSheet, node, eventSheetGroup) {
        var event = this.createEventSheetEvent(type, sheetTitle, groupName, manager, eventSheet, eventSheetGroup);
        event.labelTitle = labelTitle;

        if (node && (node.id !== undefined)) {
            event.nodeID = node.id;
        }

        if (this.includeReferences) {
            event.node = node;
        }

        return event;
    },

    createCommandEvent(type, commandName, parameters, sheetTitle, groupName, manager, eventSheet, node, eventSheetGroup) {
        var event = this.createEventSheetEvent(type, sheetTitle, groupName, manager, eventSheet, eventSheetGroup);
        event.commandName = commandName;

        if (this.includeParameters) {
            event.parameters = SerializeValue(parameters);
        }

        if (node && (node.id !== undefined)) {
            event.nodeID = node.id;
        }

        if (this.includeReferences) {
            event.node = node;
        }

        return event;
    },

    createConditionEvent(type, expression, result, sheetTitle, groupName, manager, eventSheet, node, eventSheetGroup) {
        var event = this.createEventSheetEvent(type, sheetTitle, groupName, manager, eventSheet, eventSheetGroup);
        event.expression = SerializeValue(expression);
        event.result = result;

        if (node) {
            event.conditionType = node.conditionType || 'condition';

            if (node.id !== undefined) {
                event.nodeID = node.id;
            }

            event.nodeName = node.name;
            event.nodeTitle = node.title;

            var conditionExpression = node.condition;
            var returnInfo = GetExpressionReturnInfo(conditionExpression, manager, eventSheet);
            if (returnInfo) {
                event.returnIndex = returnInfo.index;

                if (returnInfo.expression !== undefined) {
                    event.returnExpression = SerializeConditionExpression(returnInfo.expression);
                }

                if (returnInfo.value !== undefined) {
                    event.returnValue = returnInfo.value;
                }
            }
        }

        if (this.includeReferences) {
            event.node = node;
        }

        return event;
    },
}

var GetExpressionReturnInfo = function (expression, manager, eventSheet) {
    if (!expression || (expression.id === undefined) ||
        !manager || !manager.blackboard ||
        !eventSheet || (eventSheet.id === undefined)) {
        return null;
    }

    var nodeMemory = manager.blackboard.getNodeMemory(eventSheet.id, expression.id);
    var index = nodeMemory.$lastReturnIndex;
    if (index === undefined) {
        return null;
    }

    var info = {
        index: index,
    };

    var expressions = expression.expressions;
    if (Array.isArray(expressions) && (index >= 0) && (index < expressions.length)) {
        var returnExpression = expressions[index];
        info.expression = returnExpression;
        info.value = GetExpressionLastValue(returnExpression, manager, eventSheet);
    }

    return info;
}

var GetExpressionLastValue = function (expression, manager, eventSheet) {
    if (!expression || (expression.id === undefined)) {
        return expression;
    }

    var nodeMemory = manager.blackboard.getNodeMemory(eventSheet.id, expression.id);
    return nodeMemory.$lastValue;
}
