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

        var soundManagerConfig = GetValue(config, 'sounds');
        if (soundManagerConfig !== false) {
            this.soundManager = new SoundManager(scene, soundManagerConfig);
        }

        this.setTargetCamera(GetValue(config, 'camera', this.scene.sys.cameras.main));

        this.gameObjectManagers = {};

        var spriteManagerConfig = GetValue(config, 'sprites');
        if ((spriteManagerConfig !== false) && (spriteManagerConfig !== null)) {
            AddSpriteManager.call(this, spriteManagerConfig);
        }

        var textManagerConfig = GetValue(config, 'texts');
        if ((textManagerConfig !== false) && (textManagerConfig !== null)) {
            AddTextManager.call(this, textManagerConfig);
        }

        this.setClickTarget(GetValue(config, 'clickTarget', scene));  // this.clickEE
    }

    get isPlaying() {
        return this.parser.isRunning;
    }

    get spriteManager() {
        return this.getGameObjectManager('sprite');
    }

    get textManager() {
        return this.getGameObjectManager('text');
    }

    get gameObjectManagerNames() {
        var names = [];
        for (var name in this.gameObjectManagers) {
            names.push(name);
        }
        return names;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        ClearEvents(this);

        if (this.soundManager) {
            this.soundManager.destroy(fromScene);
        }
        this.soundManager = undefined;

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