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

        eventSheetManager.emit(EVT_GROUP_STOP, this.name, eventSheetManager, this);

        var trees = this.pendingTrees;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var eventsheet = trees[i];
            eventSheetManager.emit(EVT_EVENTSHEET_ABORT, eventsheet.title, this.name, eventSheetManager, eventsheet, this);
            eventsheet.abort(blackboard, commandExecutor);
            CloseEventSheet.call(this, eventSheetManager, eventsheet);
        }
        trees.length = 0;

        this.isRunning = false;
        this.clearRunContext();

        return this;
    },
}
