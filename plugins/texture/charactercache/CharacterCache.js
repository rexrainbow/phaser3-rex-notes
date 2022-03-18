import CreateFrameManager from './methods/CreateFrameManager.js';
import CreateCharacterCollection from './methods/CreateCharacterCollection.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CharacterCache {
    constructor(scene, config) {
        this.frameManager = CreateFrameManager(scene, config)

        // Create ChacacterCollection
        this.characterCollection = CreateCharacterCollection();

        // Bind text object
        var textObject = GetValue(config, 'textObject');
        if (textObject) {
            this.bindTextObject(textObject);
        }

        this.inCacheCount = 0;

        // Load content
        var content = GetValue(config, 'content')
        if (content) {
            this.load(content);
        }
    }

    bindTextObject(textObject) {
        this.textObject = textObject;
        return this;
    }

    addToBitmapFont() {
        this.frameManager.addToBitmapFont();
        return this;
    }
}

Object.assign(
    CharacterCache.prototype,
    Methods
);

export default CharacterCache;