import SoundManager from '../../../utils/audio/soundmanager/SoundManager.js';
import Timeline from '../../../time/progresses/Timeline.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var InitManagers = function (config) {
    var soundManagerConfig = GetValue(config, 'sounds');
    if (soundManagerConfig !== false) {
        this.soundManager = new SoundManager(this.scene, soundManagerConfig);
    }

    this.gameObjectManagers = {};

    this.timeline = new Timeline(this);
}

export default InitManagers;