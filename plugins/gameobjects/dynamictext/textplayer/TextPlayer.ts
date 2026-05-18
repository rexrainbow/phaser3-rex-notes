import Extend from '../../../utils/managers/Extend';
import DynamicText from '../dynamictext/DynamicText';
import Parser from './parser/Parser';
import TypeWriter from './typewriter/TypeWriter';
import ImageManager from '../../../utils/texture/imagemanager/ImageManager';
import AddSpriteManager from './methods/spritemanager/AddSpriteManager';
import Methods from './methods/Methods';
import ClearEvents from './methods/utils/ClearEvents';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class TextPlayer extends Extend(DynamicText) {
    _imageManager: any;
    addImage: any;
    destroyManagers: any;
    getGameObjectManager: any;
    getTimeScale: any;
    ignoreDestroy: any;
    initManagers: any;
    isPlaying: any;
    parser: any;
    play: any;
    scene: any;
    setIgnoreNextPageInput: any;
    setNextPageInput: any;
    setTimeScale: any;
    type: any;
    typeWriter: any;

    constructor(scene?: any, x?: any, y?: any, fixedWidth?: any, fixedHeight?: any, config?: any) {
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
        this.type = 'rexTextPlayer';

        this.parser = new Parser(this, GetValue(config, 'parser', undefined));

        this.initManagers(scene, config);

        this.typeWriter = new TypeWriter(this, GetValue(config, 'typing', undefined));

        this._imageManager = undefined;
        var imageData = GetValue(config, 'images', undefined);
        if (imageData?: any) {
            this.addImage(imageData);
        }

        var spriteManagerConfig = GetValue(config, 'sprites');
        if ((spriteManagerConfig !== false) && (spriteManagerConfig !== null)) {
            AddSpriteManager.call(this, spriteManagerConfig);
        }

        this.setIgnoreNextPageInput(GetValue(config, 'ignoreNextPageInput', false));
        this.setNextPageInput(GetValue(config, 'nextPageInput', null));

        this.isPlaying = false;

        if (content?: any) {
            this.play(content);
        }
    }

    get imageManager() {
        if (this._imageManager === undefined) {
            this._imageManager = new ImageManager(this.scene);
        }
        return this._imageManager;
    }

    get spriteManager() {
        return this.getGameObjectManager('sprite');
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        ClearEvents(this);

        this.parser.destroy();
        this.parser = undefined;

        this.typeWriter.destroy(fromScene);
        this.typeWriter = undefined;

        if (this._imageManager) {
            this._imageManager.destroy(fromScene);
        }
        this._imageManager = undefined;

        this.destroyManagers(fromScene);

        super.destroy(fromScene);
    }

    get isPageTyping() {
        return this.typeWriter.isPageTyping;
    }

    set defaultTypingSpeed(speed) {
        this.typeWriter.setDefaultTypingSpeed(speed);
    }

    get defaultTypingSpeed() {
        return this.typeWriter.defaultTypingSpeed;
    }

    set typingSpeed(speed) {
        this.typeWriter.setTypingSpeed(speed);
    }

    get typingSpeed() {
        return this.typeWriter.speed;
    }

    set timeScale(value) {
        this.setTimeScale(value);
    }

    get timeScale() {
        return this.getTimeScale();
    }
}

Object.assign(
    TextPlayer.prototype,
    Methods
);

export default TextPlayer;