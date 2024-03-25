import FadeIn from '../../../../audio/fade/FadeIn.js';
import FadeOut from '../../../../audio/fade/FadeOut.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const GetValue = Phaser.Utils.Objects.GetValue;

export default {

    getSoundEffects() {
        return this.soundEffects;
    },

    getLastSoundEffect() {
        return this.soundEffects[this.soundEffects.length - 1];
    },

    playSoundEffect(key, config) {
        if (!this.hasAudio(key)) {
            console.error(`[Sound manager] Audio key'${key}' is not existed`);
            return this;
        }

        var music = this.sound.add(key, {
            mute: GetValue(config, 'mute', this.soundEffectsMute),
            volume: GetValue(config, 'volume', this.soundEffectsVolume),
            detune: GetValue(config, 'detune', 0),
            rate: GetValue(config, 'rate', 1),
        });


        this.soundEffects.push(music);

        music
            .once('complete', function () {
                music.destroy();

                // SoundManager has been destroyed
                if (!this.sound) {
                    return;
                }
                RemoveItem(this.soundEffects, music);
            }, this)
            .once('destroy', function () {
                // SoundManager has been destroyed
                if (!this.sound) {
                    return;
                }
                RemoveItem(this.soundEffects, music);
            }, this)
            .play();

        return this;
    },

    stopAllSoundEffects() {
        for (var i = this.soundEffects.length - 1; i >= 0; i--) {
            var soundEffect = this.soundEffects[i];
            soundEffect.stop();
            soundEffect.destroy();
        }

        return this;
    },

    fadeInSoundEffect(time) {
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
            FadeIn(soundEffect, time, this.soundEffectsVolume, 0);
        }

        return this;
    },

    fadeOutSoundEffect(time, isStopped) {
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
            FadeOut(soundEffect, time, isStopped);
        }

        return this;
    },

    fadeOutAllSoundEffects(time, isStopped) {
        for (var i = this.soundEffects.length - 1; i >= 0; i--) {
            FadeOut(this.soundEffects[i], time, isStopped);
        }

        return this;
    },

    setSoundEffectMute(mute, lastSoundEffect) {
        if (mute === undefined) {
            mute = true;
        }
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        if (lastSoundEffect) {
            // Set volume of last sound effect
            var soundEffect = this.getLastSoundEffect();
            if (soundEffect) {
                soundEffect.setMute(mute);
            }

        } else {
            // Set volume of all sound effects
            this.soundEffectsMute = mute;
        }

        return this;
    },

    setSoundEffectVolume(volume, lastSoundEffect) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        if (lastSoundEffect) {
            // Set volume of last sound effect
            var soundEffect = this.getLastSoundEffect();
            if (soundEffect) {
                soundEffect.setVolume(volume);
            }

        } else {
            // Set volume of all sound effects
            this.soundEffectsVolume = volume;
        }

        return this;
    },

    setSoundEffectDetune(detune, lastSoundEffect) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        var soundEffects;
        if (lastSoundEffect) {
            soundEffects = [this.getLastSoundEffect()];
        } else {
            soundEffects = this.soundEffects;
        }

        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
            soundEffects[i].setDetune(detune);
        }

        return this;
    },

    setSoundEffectRate(rate, lastSoundEffect) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        var soundEffects;
        if (lastSoundEffect) {
            soundEffects = [this.getLastSoundEffect()];
        } else {
            soundEffects = this.soundEffects;
        }

        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
            soundEffects[i].setRate(rate);
        }

        return this;
    },
}