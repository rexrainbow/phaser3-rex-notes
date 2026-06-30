var CreateStopError = function () {
    return new Error('ActorStateMachineRunner was stopped');
}

export default {
    stop() {
        if (!this.isRunning) {
            return this;
        }

        this.isStopping = true;

        if (this.currentStateAction) {
            this.currentStateAction.markCancelled();
        }

        if (this.currentRun && (this.currentRun.status === 'running')) {
            this.currentRun.stop();
        }

        return this;
    },

    abort() {
        return this.stop();
    },

    throwIfStopping() {
        if (this.isStopping) {
            throw CreateStopError();
        }
    },

}