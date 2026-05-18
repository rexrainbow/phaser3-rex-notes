export default {
    start(key?: any) {
        this.questionManager
            .restartQuest()
            .getNextQuestion(key);
        return this;
    },

    next(key?: any) {
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

    add(questions?: any, config?: any) {
        this.questionManager.add(questions, config);
        return this;
    }
};