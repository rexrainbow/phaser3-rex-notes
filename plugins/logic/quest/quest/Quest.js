import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import Shuffle from '../../../utils/array/Shuffle.js';
import DataMethods from './DataMethods.js';

class Quest {
    constructor(questionsManager, config) {
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this.questionsManager = questionsManager;
        this.keys = [];

        this.setShuffleQuestionsEnable(GetValue(config, 'shuffleQuestions', false));
        this.setShuffleOptionsEnable(GetValue(config, 'shuffleOptions', false));
        this.start();
    }

    shutdown() {
        this.destroyEventEmitter();
        this.questionsManager = undefined;        
    }

    destroy() {
        this.shutdown();
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
        this.questionsManager.getKeys(this.keys);
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
        } else if (this.questionsManager.has(key)) {
            this.nextKey = key;
            this.nextIndex = this.keys.indexOf(key);
        } else {
            // Error
        }
        return this;
    }

    getQuestion() {
        var question = this.questionsManager.get(this.nextKey);
        if (this.shuffleOptionsEnable) {
            var options = question.options;
            if (options) {
                Shuffle(options);
            }
        }
        this.emit('quest', question, this.questionsManager, this);
        return question;
    }

    getNextQuestion(key) {
        return this.setNextKey(key).getQuestion();
    }

    isLastQuestion() {
        return this.nextIndex === (this.keys.length - 1);
    }
}

Object.assign(
    Quest.prototype,
    EventEmitterMethods,
    DataMethods
);

export default Quest;