import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetGame from '../../utils/system/GetGame.js';
import CreateFrameManager from './methods/CreateFrameManager.js';
import CreateCharacterCollection from './methods/CreateCharacterCollection.js';
import Methods from './methods/Methods.js';
import { CacheName } from './Const.js';
import GetCharacterCache from './methods/GetCharacterCache.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const TextGameObjectClass = Phaser.GameObjects.Text;

class CharacterCache {
    constructor(scene, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.game = GetGame(scene);
        this.freqMode = GetValue(config, 'freqMode', true);

        this.frameManager = CreateFrameManager(this.game, config);
        this.frameManager.addToBitmapFont(); // Add to bitmapfont at beginning

        this.key = this.frameManager.key;
        this.cellWidth = this.frameManager.cellWidth;
        this.cellHeight = this.frameManager.cellHeight;
        this.inCacheCount = 0;

        // Create ChacacterCollection
        this.characterCollection = CreateCharacterCollection();

        // Add this character cache into customCache
        this.game.cache.addCustom(CacheName).add(this.key, this);

        // Bind text object
        var textObject = GetValue(config, 'textObject');
        if (!textObject) {
            var style = GetValue(config, 'style');
            if (style) {
                textObject = new TextGameObjectClass(this.game.scene.systemScene, 0, 0, '', style);
            }
        }
        if (textObject) {
            this.bindTextObject(textObject);
        }

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

        this.game = null;
    }

    destroy() {
        this.shutdown();
    }

    bindTextObject(textObject) {
        this.textObject = textObject;
        return this;
    }

    static getCache(scene, key) {
        return GetCharacterCache(scene, key);
    }
}

Object.assign(
    CharacterCache.prototype,
    EventEmitterMethods,
    Methods
);

export default CharacterCache;