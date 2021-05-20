import DynamicText from '../dynamictext/DynamicText.js';
import Parser from './parser/Parser.js';
import TypeWriter from './typewriter/TypeWriter.js';
import ImageManager from '../../../utils/texture/imagemanager/ImageManager.js';
import SoundManager from '../../../utils/audio/soundmanager/SoundManager.js';
import SpriteManager from '../../../utils/sprite/spritemanager/SpriteManager.js';
import Methods from './methods/Methods.js';
import ClearEvents from './methods/utils/ClearEvents.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class TextPlayer extends DynamicText {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
        } else if (IsPlainObject(fixedWidth)) {
            config = fixedWidth;
        }
        if (config === undefined) {
            config = {};
        }

        // Don't set text in DynamicText's constructor
        var content = config.text;
        delete config.text;

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexBBCodeDynamicText'

        this.parser = new Parser(this, GetValue(config, 'parser', undefined));

        this.typeWriter = new TypeWriter(this, GetValue(config, 'typing', undefined));

        this._imageManager = undefined;
        var imageData = GetValue(config, 'images', undefined);
        if (imageData) {
            this.addImage(imageData);
        }

        this._soundManager = undefined;
        var soundManagerConfig = GetValue(config, 'sounds', undefined);
        if (soundManagerConfig) {
            this._soundManager = new SoundManager(this.scene, soundManagerConfig);
        }

        this._spriteManager = undefined;
        var spriteManagerConfig = GetValue(config, 'sprites', undefined);
        if (spriteManagerConfig) {
            this._spriteManager = new SpriteManager(this.scene, spriteManagerConfig);
        }

        this.setClickTarget(GetValue(config, 'clickTarget', this));  // this.clickEE

        this.setNextPageInput(GetValue(config, 'nextPageInput', 'click'));

        this.isPlaying = false;

        if (content) {
            this.play(content);
        }
    }

    get imageManager() {
        if (this._imageManager === undefined) {
            this._imageManager = new ImageManager(this.scene);
        }
        return this._imageManager;
    }

    get soundManager() {
        if (this._soundManager === undefined) {
            this._soundManager = new SoundManager(this.scene);
        }
        return this._soundManager;
    }

    get spriteManager() {
        if (this._spriteManager === undefined) {
            this._spriteManager = new SpriteManager(this.scene);
        }
        return this._spriteManager;
    }

    get camera() {
        return this.scene.cameras.main;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        ClearEvents(this);

        this.parser.destroy();
        this.parser = undefined;

        this.typeWriter.destroy();
        this.typeWriter = undefined;

        if (this._imageManager) {
            this._imageManager.destroy();
        }
        this._imageManager = undefined;

        if (this._soundManager) {
            this._soundManager.destroy();
        }
        this._soundManager = undefined;

        if (this._spriteManager) {
            this._spriteManager.destroy();
        }
        this._spriteManager = undefined;

        this.clickEE = undefined;

        super.destroy(fromScene);
    }
}

Object.assign(
    TextPlayer.prototype,
    Methods
);

export default TextPlayer;