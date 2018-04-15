import FadePlugin from './audio/FadePlugin.js';

var CONFIG = {
    volume: {}
}; // reuse this config
var soundFadeOut = function (scene, sound, duration, destroy) {
    if (destroy === undefined) {
        destroy = true;
    }
    CONFIG.mode = (destroy) ? 1 : 0;    
    CONFIG.volume.start = sound.volume;
    CONFIG.volume.end = 0;    
    CONFIG.duration = duration;

    var fade;
    if (sound.hasOwnProperty('_fade')) {
        fade = sound._fade;
        fade.stop().resetFromJSON(CONFIG).start();
    } else {
        fade = new FadePlugin(scene, sound, CONFIG);
        sound._fade = fade;
    }

    if (!sound.isPlaying) {
        sound.play();
    }
    return sound;
};
export default soundFadeOut;