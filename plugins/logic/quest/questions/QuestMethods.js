import Quest from '../quest/Quest.js';

export default {
    newQuest(config) {
        var quest = new Quest(this, config);
        return quest;
    },

    startQuest(config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('eventEmitter')) {
            config.eventEmitter = this;
        }
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
    },

    getData(key, defaultValue) {
        return this._quest.getData(key, defaultValue);
    },

    setData(key, value) {
        this._quest.setData(key, value);
        return this;
    },

    incData(key, inc, defaultValue) {
        this._quest.incData(key, inc, defaultValue);
        return this;
    },

    mulData(key, mul, defaultValue) {
        this._quest.mulData(key, inc, defaultValue);
        return this;
    },

    clearData() {
        this._quest.clearData();
        return this;
    },
};