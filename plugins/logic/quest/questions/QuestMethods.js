import Quest from '../quest/Quest.js';

export default {
    newQuest(config) {
        var quest = new Quest(this, config);
        return quest;
    },

    startQuest(config) {
        this._quest = this.newQuest(config);
        return this;
    },

    restartQuest() {
        this._quest.start();
        return this;
    },

    setNextQuestionKey(key) {
        this._quest.setNextKey(key);
        return this;
    },

    getQuestion(key) {
        if (key !== undefined) {
            this.setNextQuestionKey(key);
        }
        return this._quest.get();
    },

    getNextQuestion(key) {
        return this._quest.getNext(key);
    },

    isLastQuestion() {
        return this._quest.isLastKey;
    }
};