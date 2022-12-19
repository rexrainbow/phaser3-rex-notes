export default {
    // Interanl method
    runTransitionOutCallback() {
        this.transitOutCallback(this.parent, this.transitOutTime);
        return this.transitOutTime;
    },

    // Override
    onClose() {
        if (this.oneShotMode) {
            this.parent.destroy();
            // Will invoke `this.destroy()`
        }
    },

    requestClose(closeEventData, duration) {
        // Only can close modal in OPEN state
        if (this._state.state !== 'OPEN') {
            return this;
        }

        this.closeEventData = (arguments.length > 0) ? closeEventData : this.parent;
        this.close(duration);

        return this;
    },

    close(duration) {
        // Do nothing if current state is TRANS_CLOSE already
        if (this._state.state === 'TRANS_CLOSE') {
            return this;
        }

        var transitionTimeSave = this.transitOutTime;
        if (duration !== undefined) {
            this.transitOutTime = duration;
        }

        this._state.goto('TRANS_CLOSE');

        this.transitOutTime = transitionTimeSave;

        return this;
    },

}