import { CloseEventSheet } from './RunMethods.js';

export default {
    stop() {
        var eventSheetManager = this.parent;
        var blackboard = eventSheetManager.blackboard;
        var commandExecutor = eventSheetManager.commandExecutor;

        var trees = this.pendingTrees;
        for (var i = 0, cnt = trees.length; i < cnt; i++) {
            var eventsheet = trees[i];
            eventsheet.abort(blackboard, commandExecutor);
            CloseEventSheet.call(this, eventSheetManager, eventsheet);
        }
        trees.length = 0;

        this.isRunning = false;

        return this;
    },
}