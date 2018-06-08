import Fade from './Fade.js';

var fadeIn = function (scene, sound, duration, endVolume, startVolume) {
    if (endVolume === undefined) {
        endVolume = 1;
    }
    if (startVolume === undefined) {
        startVolume = 0;
    }
    CONFIG.mode = 0;
    CONFIG.volume.start = startVolume;
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
        fade = new Fade(scene, sound, CONFIG);
        sound._fade = fade;
    }

    fade.start();
    if (!sound.isPlaying) {
        sound.setVolume(startVolume).play();
    }
    return sound;
};

var CONFIG = {
    volume: {}
}; // reuse this config

export default fadeIn;