
export default {
    getCurrentFrame() {
        return (this.game && this.game.loop) ? this.game.loop.frame : undefined;
    },

    saveRemainderDistanceBudget(remainingDistanceBudget) {
        if ((!this.continueAfterComplete) || (remainingDistanceBudget <= 0)) {
            return;
        }

        var currentFrame = this.getCurrentFrame();
        this._remainderFrame = currentFrame;
        if (currentFrame === undefined) {
            this._remainderDistanceBudget = 0;
        } else {
            this._remainderDistanceBudget = remainingDistanceBudget;
        }

    },

    getRemainderDistanceBudget() {
        if (this._remainderFrame !== this.getCurrentFrame()) {
            this._remainderDistanceBudget = 0;
        }

        return this._remainderDistanceBudget;
    },

    clearRemainderDistanceBudget() {
        this._remainderFrame = undefined;
        this._remainderDistanceBudget = 0;
    },
}