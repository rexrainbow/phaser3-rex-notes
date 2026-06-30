import {
    EVT_GROUP_COMPLETE,
    EVT_GROUP_STOP,
} from '../constants.js';

var CreateStopError = function (groupName) {
    return new Error(`Event sheet group '${groupName}' was stopped`);
}

var SerialNumber = 0;
var CreateID = function () {
    SerialNumber += 1;
    return `run#${SerialNumber}`;
}

class Runner {
    constructor(eventSheetManager, config = {}) {
        this.manager = eventSheetManager;
        this.id = config.id || CreateID();
        this.groupName = config.groupName;
        this.args = config.args || [];
        this.status = 'pending';

        var self = this;
        this.completeCallback = function (completedGroupName) {
            if (completedGroupName !== self.groupName) {
                return;
            }

            self.complete(self.manager);
        }

        this.stopCallback = function (stoppedGroupName) {
            if (stoppedGroupName !== self.groupName) {
                return;
            }

            self.stopped(CreateStopError(self.groupName));
        }

        this.promise = new Promise(function (resolve, reject) {
            self._resolve = resolve;
            self._reject = reject;
        });
    }

    start() {
        if (this.status !== 'pending') {
            return this;
        }

        var eventSheetGroup = this.manager.getTreeGroup(this.groupName);
        if (eventSheetGroup.isRunning) {
            return this.fail(new Error(`Event sheet group '${this.groupName}' is already running`));
        }

        this.bindEvents();

        try {
            this.status = 'running';
            this.manager.start.apply(this.manager, this.args);

            if (!eventSheetGroup.isRunning) {
                this.complete(this.manager);
            }
        } catch (error) {
            this.fail(error);
        }

        return this;
    }

    stop() {
        if (this.status !== 'running') {
            return this;
        }

        this.manager.stop(this.groupName);
        return this;
    }

    cancel() {
        return this.stop();
    }

    complete(value) {
        return this.settle('completed', value);
    }

    stopped(error) {
        return this.settle('stopped', error);
    }

    fail(error) {
        return this.settle('failed', error);
    }

    bindEvents() {
        this.manager.on(EVT_GROUP_COMPLETE, this.completeCallback);
        this.manager.on(EVT_GROUP_STOP, this.stopCallback);
        return this;
    }

    cleanup() {
        this.manager.off(EVT_GROUP_COMPLETE, this.completeCallback);
        this.manager.off(EVT_GROUP_STOP, this.stopCallback);
        return this;
    }

    settle(status, value) {
        if ((this.status !== 'pending') && (this.status !== 'running')) {
            return this;
        }

        this.cleanup();
        this.status = status;

        if (status === 'completed') {
            this._resolve(value);
        } else {
            this._reject(value);
        }

        return this;
    }
}

export default Runner;
