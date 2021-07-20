import SoundFade from './soundfade.js';

const FadeIn = SoundFade.fadeIn;
const FadeOut = SoundFade.fadeOut;

class SoundFadePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    fadeIn(scene, sound, duration, endVolume, startVolume) {
        return FadeIn(scene, sound, duration, endVolume, startVolume);
    }

    fadeOut(scene, sound, duration, destroy) {
        return FadeOut(scene, sound, duration, destroy);
    }
}

export default SoundFadePlugin;