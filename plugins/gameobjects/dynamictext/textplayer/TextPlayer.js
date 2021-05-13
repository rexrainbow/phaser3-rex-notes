import DynamicText from '../dynamictext/DynamicText.js';
import Parser from './parser/Parser.js';
import ImageManager from '../../../utils/texture/ImageManager/ImageManager.js';
import TypeWriter from './typewriter/TypeWriter.js';
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

        this.setClickTarget(GetValue(config, 'clickTarget', this));  // this.clickEE

        this.setNextPageInput(GetValue(config, 'nextPageInput', 'click'));

        this.soundEffect = undefined;
        this.backgroundMusic = undefined;

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

        this.clickEE = undefined;

        super.destroy(fromScene);
    }
}

Object.assign(
    TextPlayer.prototype,
    Methods
);

export default TextPlayer;