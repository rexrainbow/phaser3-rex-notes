import soundFade from './soundfade.js';

const fadeIn = soundFade.fadeIn;
const fadeOut = soundFade.fadeOut;

class SoundFadePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    fadeIn(scene, sound, duration, endVolume, startVolume) {
        return fadeIn(scene, sound, duration, endVolume, startVolume);
    }

    fadeOut(scene, sound, duration, destroy) {
        return fadeOut(scene, sound, duration, destroy);
    }
}

export default SoundFadePlugin;