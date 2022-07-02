import Parser from './parser/Parser.js';
import Timeline from '../../../time/progresses/Timeline.js';
import SoundManager from '../../../utils/audio/soundmanager/SoundManager.js';
import SpriteManager from '../../../utils/sprite/spritemanager/SpriteManager.js';
import TextManager from '../../../utils/text/textmanager/TextManager.js';
import Methods from './methods/Methods.js';
import ClearEvents from './methods/utils/ClearEvents.js';

const EventEmitter = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class TagPlayer extends EventEmitter {
    constructor(scene, config) {
        super();

        this.scene = scene;

        this.parser = new Parser(this, GetValue(config, 'parser', undefined));

        this.timeline = new Timeline(this);

        this._soundManager = undefined;
        var soundManagerConfig = GetValue(config, 'sounds', undefined);
        if (soundManagerConfig) {
            this._soundManager = new SoundManager(this.scene, soundManagerConfig);
        }

        this.setTargetCamera(GetValue(config, 'camera', this.scene.sys.cameras.main));

        this._spriteManager = undefined;
        var spriteManagerConfig = GetValue(config, 'sprites', undefined);
        if (spriteManagerConfig) {
            this._spriteManager = new SpriteManager(this.scene, spriteManagerConfig);
        }

        this._textManager = undefined;
        var textManagerConfig = GetValue(config, 'texts', undefined);
        if (textManagerConfig) {
            this._textManager = new TextManager(this.scene, textManagerConfig);
        }

        this.setClickTarget(GetValue(config, 'clickTarget', scene));  // this.clickEE
    }

    get isPlaying() {
        return this.parser.isRunning;
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

    get textManager() {
        if (this._textManager === undefined) {
            this._textManager = new TextManager(this.scene);
        }
        return this._textManager;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        ClearEvents(this);

        if (this._soundManager) {
            this._soundManager.destroy(fromScene);
        }
        this._soundManager = undefined;

        this.camera = undefined;

        if (this._spriteManager) {
            this._spriteManager.destroy(fromScene);
        }
        this._spriteManager = undefined;

        this.scene = undefined;
    }
}

Object.assign(
    TagPlayer.prototype,
    Methods
);

export default TagPlayer;