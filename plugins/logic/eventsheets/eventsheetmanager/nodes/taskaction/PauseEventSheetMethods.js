export default {
    // Called by commandExecutor -> eventSheetManager
    pauseEventSheet(tick) {
        // Pause eventSheetGroup, wait until eventEmitter fires resumeEventName
        var eventSheetGroup = tick.tree.eventSheetGroup;

        // Pause eventSheetGroup
        this.isRunning = true;

        var self = this;
        var waitId = this.waitId;
        var taskCompleteCallback = function () {
            // Expired
            if (waitId < self.waitId) {
                return;
            }
            self.waitId++;

            // Resume event sheet group
            self.isRunning = false;
            eventSheetGroup.continue();
        }

        return taskCompleteCallback;
    },

    pauseEventSheetUnitlEvent(tick, eventEmitter, eventName = 'complete') {
        var resumeCallback = this.pauseEventSheet(tick);

        var self = this;
        var wrapResumeCallback = function () {
            self.removeTaskCompleteCallback = undefined;
            resumeCallback();
        }

        // Remove task-complete callback when aborting this node            
        this.removeTaskCompleteCallback = function () {
            eventEmitter.off(eventName, wrapResumeCallback);
            self.removeTaskCompleteCallback = undefined;
        }

        eventEmitter.once(eventName, wrapResumeCallback);

        return this;
    }
}