export default {
    getRoundCounter() {
        return this.blackboard.getCurrentTime();
    },

    setRoundCounter(value) {
        this.blackboard.setCurrentTime(value);
        return this;
    },

    updateRoundCounter(value) {
        if (value === undefined) {
            this.blackboard.incCurrentTime(1);
        } else {
            this.blackboard.setCurrentTime(value);
        }

        return this;
    }
}