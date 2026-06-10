import GetManagerID from './GetManagerID.js';
import SerializeValue from './SerializeValue.js';

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
        }

        if (this.includeReferences) {
            event.node = node;
        }

        return event;
    },
}
