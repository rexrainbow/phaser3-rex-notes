import SoundManager from '../audio/soundmanager/SoundManager.js';
import Timeline from '../../time/progresses/Timeline.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var InitManagers = function (scene, config) {
    var soundManagerConfig = GetValue(config, 'sounds');
    if (soundManagerConfig !== false) {
        this.soundManager = new SoundManager(scene, soundManagerConfig);
    }

    this.gameObjectManagers = {};

    this.timeline = new Timeline(this);

    this.managersScene = scene;

    return this;
}

export default InitManagers;