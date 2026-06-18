import { RUNNING } from '../../../behaviortree/constants.js';
import RemoveItem from '../../../../utils/array/Remove.js';
import {
    EVT_EVENTSHEET_REMOVE,
    EVT_EVENTSHEET_REMOVE_ALL,
} from '../constants.js';

export default {
    removeTrees(removedTrees) {
        if (removedTrees.length === 0) {
            return this;
        }

        for (var i = 0, cnt = removedTrees.length; i < cnt; i++) {
            this.parent.blackboard.removeTreeData(removedTrees[i].id);
        }

        RemoveItem(this.trees, removedTrees.slice());
        RemoveItem(this.pendingTrees, removedTrees.slice());
        RemoveItem(this.closedTrees, removedTrees.slice());

        for (var i = 0, cnt = removedTrees.length; i < cnt; i++) {
            var eventsheet = removedTrees[i];
            eventsheet.pendingRemove = false;
            this.parent.emit(EVT_EVENTSHEET_REMOVE, eventsheet.title, this.name, this.parent, eventsheet, this);
        }

        return this;
    },

    removeAllEventSheets() {
        var removedTrees = this.trees.slice();
        var sheetTitles = removedTrees.map(function (eventsheet) {
            return eventsheet.title;
        });

        removedTrees.forEach(function (eventsheet) {
            this.parent.blackboard.removeTreeData(eventsheet.id);
            eventsheet.pendingRemove = false;
        }, this);

        this.trees.length = 0;
        this.pendingTrees.length = 0;
        this.closedTrees.length = 0;
        this.isRunning = false;
        this.clearRunContext();

        if (sheetTitles.length > 0) {
            this.parent.emit(EVT_EVENTSHEET_REMOVE_ALL, this.name, sheetTitles, this.parent, this);
        }

        return this;
    },

    removeAllEventSheetsLater() {
        this.trees.forEach(function (eventsheet) {
            eventsheet.pendingRemove = true;
        });

        if (!this.isRunning) {
            this.removePendingEventSheets();
        }

        return this;
    },

    removeEventSheet(title) {
        var removedTrees = [];
        this.trees.forEach(function (eventsheet) {
            if (eventsheet.title !== title) {
                return;
            }
            var status = this.getTreeState(eventsheet);
            if (status === RUNNING) {
                // Can't remove RUNNING eventsheet
                return;
            }

            removedTrees.push(eventsheet);
        }, this);

        return this.removeTrees(removedTrees);
    },

    removeEventSheetLater(title) {
        this.trees.forEach(function (eventsheet) {
            if (eventsheet.title !== title) {
                return;
            }

            eventsheet.pendingRemove = true;
        });

        if (!this.isRunning) {
            this.removePendingEventSheets();
        }

        return this;
    },

    // Internal method
    removePendingEventSheets() {
        var removedTrees = [];

        this.trees.forEach(function (eventsheet) {
            if (eventsheet.pendingRemove) {
                removedTrees.push(eventsheet);
            }
        });

        return this.removeTrees(removedTrees);
    },
}
