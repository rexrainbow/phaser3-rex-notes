import {
    EVT_LABEL_ENTER,
    EVT_LABEL_EXIT,
} from '../../eventsheetmanager/constants.js';

export default {
    onLabelEnter(labelTitle, sheetTitle, groupName, manager, eventSheet, labelNode, eventSheetGroup) {
        this.addEvent(this.createNodeEvent(EVT_LABEL_ENTER, labelTitle, sheetTitle, groupName, manager, eventSheet, labelNode, eventSheetGroup), manager, groupName);
    },

    onLabelExit(labelTitle, sheetTitle, groupName, manager, eventSheet, labelNode, eventSheetGroup) {
        this.addEvent(this.createNodeEvent(EVT_LABEL_EXIT, labelTitle, sheetTitle, groupName, manager, eventSheet, labelNode, eventSheetGroup), manager, groupName);
    },
}