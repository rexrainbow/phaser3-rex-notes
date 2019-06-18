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

    setNextQuestKey(key) {
        this._quest.setNextKey(key);
        return this;
    },

    getQuest(key) {
        if (key !== undefined) {
            this.setNextQuestKey(key);
        }
        return this._quest.get();
    },

    getNextQuest(key) {
        return this._quest.getNext(key);
    },

    isLastQuest() {
        return this._quest.isLastKey;
    }
};