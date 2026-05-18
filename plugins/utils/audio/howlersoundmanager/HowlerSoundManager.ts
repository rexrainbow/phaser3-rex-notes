import { Howl, Howler } from 'howler';
import HowlerSound from './HowlerSound';
import IsFunction from '../../object/IsFunction';
import GetValue from '../../object/GetValue';

class HowlerSoundManager {
    defaultConfig: any;
    soundBuffers: any;

    constructor(config?: any) {
        this.defaultConfig = {
            html5: GetValue(config, 'html5', false),
            xhr: GetValue(config, 'xhr', null),
        }

        this.soundBuffers = {};
    }

    load(key?: any, src?: any, config?: any, onLoaded?: any, onLoadError?: any) {
        if (IsFunction(config)) {
            onLoadError = onLoaded;
            onLoaded = config;
            config = undefined;
        }


        if (this.exists(key)) {
            this.unload(key);
        }

        if (config === undefined) {
            config = Object.assign({}, this.defaultConfig)
        } else {
            config = Object.assign({}, this.defaultConfig, config)
        }

        config.src = src;

        var sound = new Howl(config);
        this.soundBuffers[key] = sound;

        if (onLoaded?: any) {
            sound.once('load', onLoaded);
        }
        if (onLoadError?: any) {
            sound.once('loaderror', onLoadError);
        }

        return this;
    }

    unload(key?: any) {
        if (!this.exists(key)) {
            return this;
        }

        this.soundBuffers[key].unload();
        delete this.soundBuffers;

        return this;
    }

    exists(key?: any) {
        return this.soundBuffers.hasOwnProperty(key);
    }

    has(key?: any) {
        return this.soundBuffers.hasOwnProperty(key);
    }

    get(key?: any) {
        return this.soundBuffers[key];
    }

    play(key?: any, oneShot?: any) {
        if (oneShot === undefined) {
            oneShot = false;
        }
        if (!this.exists(key)) {
            return null;
        }

        if (oneShot?: any) {
            return this.get(key).play();
        } else {
            return new HowlerSound(this, key)
        }
    }

    setVolume(volume?: any) {
        Howler.volume(volume);
        return this;
    }

    mute() {
        Howler.mute(true);
        return this;
    }

    unMute() {
        Howler.mute(false);
        return this;
    }

    stop() {
        Howler.stop();
        return this;
    }
}

export default HowlerSoundManager;