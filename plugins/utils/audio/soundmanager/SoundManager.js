import GetSoundManager from '../../../utils/system/GetSoundManager.js';
import BackgroundMusicMethods from './BackgroundMusicMethods.js';
import SoundEffectsMethods from './SoundEffectsMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class SoundManager {
    constructor(game, config) {
        this.sound = GetSoundManager(game);

        // Background music will be (fade out)destroyed when play next one.
        this.backgroundMusic = undefined;
        this._backgroundMusicVolume = GetValue(config, 'bgm.volume', 1);

        // Sound effect will be destroyed when completed
        this.soundEffects = [];
        this._soundEffectsVolume = GetValue(config, 'soundEffect.volume', 1);

        this.setBackgroundMusicLoopValue(GetValue(config, 'bgm.loop', true));
        this.setBackgroundMusicFadeTime(GetValue(config, 'bgm.fade', 500));

        var initialBackgroundMusic = GetValue(config, 'bgm.initial', undefined);
        if (initialBackgroundMusic) {
            this.setCurrentBackgroundMusic(initialBackgroundMusic);
        }
    }

    destroy() {
        if (this.soundEffects.length) {
            for (var i = this.soundEffects.length - 1; i >= 0; i--) {
                this.soundEffects[i].destroy();
            }
        }
        this.soundEffects.length = 0;

        if (this.backgroundMusic) {
            this.backgroundMusic.destroy();
        }
        this.backgroundMusic = undefined;

        this.sound = undefined;

        return this;
    }

    get backgroundMusicVolume() {
        return this._backgroundMusicVolume;
    }

    set backgroundMusicVolume(value) {
        this._backgroundMusicVolume = value;
        if (this.backgroundMusic) {
            this.backgroundMusic.setVolume(value);
        }
    }

    get soundEffectsVolume() {
        return this._soundEffectsVolume;
    }

    set soundEffectsVolume(value) {
        this._soundEffectsVolume = value;
        var soundEffects = this.soundEffects;
        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
            soundEffects[i].setVolume(value);
        }
    }

}

Object.assign(
    SoundManager.prototype,
    BackgroundMusicMethods,
    SoundEffectsMethods,
)

export default SoundManager;