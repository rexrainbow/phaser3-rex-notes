import SoundManager from '../../../utils/audio/soundmanager/SoundManager.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var InitManagers = function (scene, config) {
    this.scene = scene;

    // this.soundManager
    var soundManagerConfig = GetValue(config, 'sounds');
    if (soundManagerConfig !== false) {
        this.soundManager = new SoundManager(scene, soundManagerConfig);
    }

    this.gameObjectManagers = {};
}

export default InitManagers;