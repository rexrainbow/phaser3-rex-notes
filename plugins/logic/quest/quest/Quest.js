import GetValue from '../../../utils/object/GetValue.js';
import Shuffle from '../../../utils/array/Shuffle.js';

class Quest {
    constructor(form, config) {
        this.form = form;
        this.questsKeys = [];

        this.setShuffleQuestsEnable(GetValue(config, 'shuffleQuests', false));
        this.setShuffleOptionsEnable(GetValue(config, 'shuffleOptions', false));
        this.start();
    }

    setShuffleQuestsEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.shuffleQuests = enabled;
        return this;
    }

    setShuffleOptionsEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.shuffleOptions = enabled;
        return this;
    }

    start() {
        // Reload questKeys
        this.questsKeys.length = 0;
        this.form.getKeys(this.questsKeys);
        if (this.shuffleQuests) {
            Shuffle(this.questsKeys);
        }

        this.nextQuestIndex = -1;
        this.nextQuestKey = undefined;
        return this;
    }

    setNextKey(questKey) {
        if (questKey === undefined) {
            this.nextQuestIndex++;
            this.nextQuestKey = this.questsKeys[this.nextQuestIndex];
        } else if (this.form.has(questKey)) {
            this.nextQuestKey = questKey;
            this.nextQuestIndex = this.questsKeys.indexOf(questKey);
        } else {
            // Error
        }
        return this;
    }

    get() {
        var quest = this.form.get(this.nextQuestKey);
        if (this.shuffleOptions) {
            var options = quest.options;
            if (options) {
                Shuffle(options);
            }
        }
        return this.form.get(this.nextQuestKey);
    }

    getNext(questKey) {
        return this.setNextKey(questKey).get();
    }

    get isLastKey() {
        return this.nextQuestIndex === (this.questsKeys.length-1);
    }
}

export default Quest;