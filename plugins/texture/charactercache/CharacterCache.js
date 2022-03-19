import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import CreateFrameManager from './methods/CreateFrameManager.js';
import CreateCharacterCollection from './methods/CreateCharacterCollection.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CharacterCache {
    constructor(scene, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.frameManager = CreateFrameManager(scene, config)
        this.fontKey = this.frameManager.key;

        // Create ChacacterCollection
        this.characterCollection = CreateCharacterCollection();

        // Bind text object
        var textObject = GetValue(config, 'textObject');
        if (textObject) {
            this.bindTextObject(textObject);
        }

        this.inCacheCount = 0;

        // Load content
        this.load(GetValue(config, 'content', ''));
    }

    shutdown() {
        this.destroyEventEmitter();

        this.frameManager.destroy();
        this.characterCollection = undefined;
        if (this.textObject) {
            this.textObject.destroy();
        }
    }

    destroy() {
        this.shutdown();
    }

    bindTextObject(textObject) {
        this.textObject = textObject;
        return this;
    }
}

Object.assign(
    CharacterCache.prototype,
    EventEmitterMethods,
    Methods
);

export default CharacterCache;