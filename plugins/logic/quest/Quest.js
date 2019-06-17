import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import RestorableData from '../../data/restorabledata/DataManager.js';

const Shuffle = Phaser.Utils.Array.Shuffle;

const GetValue = Phaser.Utils.Objects.GetValue;
const Data = Phaser.Data.DataManager;

class Quest {
    constructor(form, config) {
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this.form = form;

        var restorable = GetValue(config, 'restorable', false);
        if (!restorable) {
            this.data = new Data(this, this);;
        } else {
            this.data = new RestorableData(this, this);;
        }

        this.shuffleQuests = GetValue(config, 'shuffleQuests', false);
        this.shuffleOptions = GetValue(config, 'shuffleOptions', false);

        this.questsKeys = form.getKeys();
        if (this.shuffleQuests) {
            Shuffle(this.questsKeys);
        }
        this.key = this.questsKeys[0];
    }

    getNext() {
    }
}

Object.assign(
    Quest.prototype,
    EventEmitterMethods
);

export default Quest;