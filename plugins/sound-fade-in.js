import FadePlugin from './audio/FadePlugin.js';

var CONFIG = {
    volume: {}
}; // reuse this config
var soundFadeIn = function (scene, sound, duration, endVolume, startVolume) {
    if (endVolume === undefined) {
        endVolume = 1;
    }
    if (startVolume === undefined) {
        startVolume = 0;
    }
    CONFIG.volume.start = 0;
    CONFIG.volume.end = endVolume;
    CONFIG.duration = duration;

    // create sound instance by key
    if (typeof (sound) === 'string') {
        sound = scene.sound.add(sound);
    }

    var fade;
    if (sound.hasOwnProperty('_fade')) {
        fade = sound._fade;
        fade.stop().resetFromJSON(CONFIG);
    } else {
        fade = new FadePlugin(scene, sound, CONFIG);
        sound._fade = fade;
    }

    fade.start();
    if (!sound.isPlaying) {
        sound.setVolume(startVolume).play();
    }
    return sound;
};
export default soundFadeIn;