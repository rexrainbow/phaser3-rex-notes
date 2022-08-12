import Parser from './parser/Parser.js';
import Timeline from '../../../time/progresses/Timeline.js';
import SoundManager from '../../../utils/audio/soundmanager/SoundManager.js';
import AddSpriteManager from './methods/spritemanager/AddSpriteManager.js';
import AddTextManager from './methods/textmanager/AddTextManager.js';
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

        this.gameObjectManagers = {};
        AddSpriteManager.call(this, GetValue(config, 'sprites'));
        AddTextManager.call(this, GetValue(config, 'texts'));

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
        return this.getGameObjectManager('sprite');
    }

    get textManager() {
        return this.getGameObjectManager('text');
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

        for (var name in this.gameObjectManagers) {
            this.gameObjectManagers.destroy(fromScene);
            delete this.gameObjectManagers[name];
        }

        this.scene = undefined;
    }
}

Object.assign(
    TagPlayer.prototype,
    Methods
);

export default TagPlayer;