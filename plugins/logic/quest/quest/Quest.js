import GetValue from '../../../utils/object/GetValue.js';
import Shuffle from '../../../utils/array/Shuffle.js';

class Quest {
    constructor(form, config) {
        this.form = form;
        this.keys = [];

        this.setShuffleQuestionsEnable(GetValue(config, 'shuffleQuestions', false));
        this.setShuffleOptionsEnable(GetValue(config, 'shuffleOptions', false));
        this.start();
    }

    setShuffleQuestionsEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.shuffleQuestionsEnable = enabled;
        return this;
    }

    setShuffleOptionsEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.shuffleOptionsEnable = enabled;
        return this;
    }

    start() {
        // Reload keys
        this.keys.length = 0;
        this.form.getKeys(this.keys);
        if (this.shuffleQuestionsEnable) {
            Shuffle(this.keys);
        }

        this.nextIndex = -1;
        this.nextKey = undefined;
        return this;
    }

    setNextKey(key) {
        if (key === undefined) {
            this.nextIndex++;
            this.nextKey = this.keys[this.nextIndex];
        } else if (this.form.has(key)) {
            this.nextKey = key;
            this.nextIndex = this.keys.indexOf(key);
        } else {
            // Error
        }
        return this;
    }

    get() {
        var question = this.form.get(this.nextKey);
        if (this.shuffleOptionsEnable) {
            var options = question.options;
            if (options) {
                Shuffle(options);
            }
        }
        return this.form.get(this.nextKey);
    }

    getNext(key) {
        return this.setNextKey(key).get();
    }

    get isLastKey() {
        return this.nextIndex === (this.keys.length-1);
    }
}

export default Quest;