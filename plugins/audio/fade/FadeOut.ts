import Fade from './Fade';
import IsSoundObject from '../../utils/system/IsSoundObject';

var FadeOut = function(scene?: any, sound?: any, duration?: any, destroy?: any) {
    if (IsSoundObject(scene)) {
        destroy = duration;
        duration = sound;
        sound = scene;
        scene = undefined;
    }

    if (destroy === undefined) {
        destroy = true;
    }

    var config = {
        mode: ((destroy) ? 2 : 1), // 1: stop, 2: destroy
        volume: {
            start: sound.volume,
            end: 0
        },
        duration: duration
    }

    var fade;
    if (sound.hasOwnProperty('_fade')) {
        fade = sound._fade;
        fade.stop().resetFromJSON(config);
    } else {
        fade = new Fade(scene, sound, config);
        sound._fade = fade;
    }

    fade.start();
    if (!sound.isPlaying) {
        sound.play();
    }
    return sound;
};

export default FadeOut;