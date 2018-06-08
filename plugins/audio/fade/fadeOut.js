import Fade from './Fade.js';

var fadeOut = function (scene, sound, duration, destroy) {
    if (destroy === undefined) {
        destroy = true;
    }
    CONFIG.mode = (destroy) ? 2 : 1; // 1: stop, 2: destroy
    CONFIG.volume.start = sound.volume;
    CONFIG.volume.end = 0;
    CONFIG.duration = duration;

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
        sound.play();
    }
    return sound;
};

var CONFIG = {
    volume: {}
}; // reuse this config

export default fadeOut;