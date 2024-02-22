export default {
    start(key) {
        this.questionManager
            .restartQuest()
            .getNextQuestion(key);
        return this;
    },

    next(key) {
        this.questionManager
            .getNextQuestion(key);
        return this;
    },

    isLast() {
        return this.questionManager.isLastQuestion();
    },

    removeAll() {
        this.questionManager.removeAll();
        return this;
    },

    add(questions, config) {
        this.questionManager.add(questions, config);
        return this;
    }
};