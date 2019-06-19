import IsPlainObject from '../../../utils/object/IsPlainObject.js';
import Quest from '../quest/Quest.js';

export default {
    newQuest(config) {
        var quest = new Quest(this, config);
        return quest;
    },

    startQuest(config) {
        if (!IsPlainObject(config)) {
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
        return this._quest.getQuestion();
    },

    getNextQuestion(key) {
        return this._quest.getNextQuestion(key);
    },

    isLastQuestion() {
        return this._quest.isLastQuestion();
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