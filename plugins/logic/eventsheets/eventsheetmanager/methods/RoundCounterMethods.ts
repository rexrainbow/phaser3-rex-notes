export default {
    getRoundCounter() {
        return this.blackboard.getCurrentTime();
    },

    setRoundCounter(value?: any) {
        this.blackboard.setCurrentTime(value);
        return this;
    },

    updateRoundCounter(value?: any) {
        if (value === undefined) {
            this.blackboard.incCurrentTime(1);
        } else {
            this.blackboard.setCurrentTime(value);
        }

        return this;
    }
}