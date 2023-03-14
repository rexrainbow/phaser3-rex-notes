import { Howl, Howler } from 'howler';
import HowlerSound from './HowlerSound.js';
import IsFunction from '../../object/IsFunction.js'

class HowlerSoundManager {
    constructor() {
        this.soundBuffers = {};
    }

    load(key, src, config, onLoaded) {
        if (IsFunction(config)) {
            onLoaded = config;
            config = undefined;
        }
        if (config === undefined) {
            config = {};
        }
        config.src = src;
        var sound = new Howl(config);
        this.soundBuffers[key] = sound;

        if (onLoaded) {
            sound.once('load', onLoaded);
        }

        return this;
    }

    get(key) {
        return this.soundBuffers[key];
    }

    has(key) {
        return this.soundBuffers.hasOwnProperty(key);
    }

    play(key) {
        if (this.has(key)) {
            return new HowlerSound(this, key)
        }
    }
}

export default HowlerSoundManager;