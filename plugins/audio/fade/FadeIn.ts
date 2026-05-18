import Fade from './Fade';
import IsSoundObject from '../../utils/system/IsSoundObject';

var FadeIn = function(scene?: any, sound?: any, duration?: any, endVolume?: any, startVolume?: any) {
    if (IsSoundObject(scene)) {
        startVolume = endVolume;
        endVolume = duration;
        duration = sound;
        sound = scene;
        scene = undefined;
    }

    if (endVolume === undefined) {
        endVolume = 1;
    }
    if (startVolume === undefined) {
        startVolume = 0;
    }

    var config = {
        mode: 0,
        volume: {
            start: startVolume,
            end: endVolume
        },
        duration: duration
    }

    // create sound instance by key
    if (typeof (sound) === 'string') {
        sound = scene.sys.sound.add(sound);
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
        sound.setVolume(startVolume).play();
    }
    return sound;
};

export default FadeIn;