import {
    EVT_COMMAND_PAUSE,
    EVT_COMMAND_RESUME,
    EVT_COMMAND_END,
} from '../../constants.js';

export default {
    // Called by commandExecutor -> eventSheetManager
    pauseEventSheet(tick) {
        // Pause eventSheetGroup, wait until eventEmitter fires resumeEventName
        var eventSheetGroup = tick.tree.eventSheetGroup;
        var eventSheetManager = tick.blackboard.eventSheetManager;
        var eventSheet = tick.tree;
        var taskName = this.properties.name;
        var parameters = this.evaledParameters;
        var groupName = eventSheetGroup.name;

        // Pause eventSheetGroup
        this.isRunning = true;
        eventSheetManager.emit(EVT_COMMAND_PAUSE, taskName, parameters, eventSheet.title, groupName, eventSheetManager, eventSheet, this, eventSheetGroup);

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
            eventSheetManager.emit(EVT_COMMAND_RESUME, taskName, parameters, eventSheet.title, groupName, eventSheetManager, eventSheet, self, eventSheetGroup);
            eventSheetManager.emit(EVT_COMMAND_END, taskName, parameters, true, undefined, eventSheet.title, groupName, eventSheetManager, eventSheet, self, eventSheetGroup);
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
