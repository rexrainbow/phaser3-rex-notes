export default {
    // Interanl method
    runTransitionInCallback() {
        this.transitInCallback(this.parent, this.transitInTime);
        return this.transitInTime;
    },

    // Override
    onOpen() {
    },

    requestOpen(duration) {
        if (!this._state.canOpen) {
            return this;
        }

        var transitionTimeSave = this.transitInTime;
        if (duration !== undefined) {
            this.transitInTime = duration;
        }

        this._state.goto('TRANS_OPNE');

        this.transitInTime = transitionTimeSave;

        return this;
    },
}