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
        // Only can close modal in IDLE state
        if (this._state.state !== 'IDLE') {
            return this;
        }

        this.open(duration);

        return this;
    },

    open(duration) {
        // Do nothing if current state is TRANS_OPNE already
        if (this._state.state === 'TRANS_OPNE') {
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