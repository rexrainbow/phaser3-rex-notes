import { CloseEventSheet } from './RunMethods.js';
import {
    EVT_GROUP_STOP,
    EVT_EVENTSHEET_ABORT,
} from '../constants.js';

export default {
    stop() {
        var eventSheetManager = this.parent;
        var blackboard = eventSheetManager.blackboard;
        var commandExecutor = eventSheetManager.commandExecutor;
        var trees = this.pendingTrees.slice();

        this.pendingTrees.length = 0;
        this.closedTrees.length = 0;
        this.isRunning = false;

        eventSheetManager.emit(EVT_GROUP_STOP, this.name, eventSheetManager, this);

        try {
            for (var i = 0, cnt = trees.length; i < cnt; i++) {
                var eventsheet = trees[i];
                if (eventsheet.roundComplete) {
                    continue;
                }

                eventsheet.abort(blackboard, commandExecutor);
                eventSheetManager.emit(EVT_EVENTSHEET_ABORT, eventsheet.title, this.name, eventSheetManager, eventsheet, this);
                CloseEventSheet.call(this, eventSheetManager, eventsheet);
            }
        } finally {
            this.clearRunContext();
            this.removePendingEventSheets();
        }

        return this;
    },
}
