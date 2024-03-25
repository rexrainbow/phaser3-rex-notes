import FadeIn from '../../../../audio/fade/FadeIn.js';
import FadeOut from '../../../../audio/fade/FadeOut.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const GetValue = Phaser.Utils.Objects.GetValue;

export default {

    getSoundEffects2() {
        return this.soundEffects2;
    },

    getLastSoundEffect2() {
        return this.soundEffects2[this.soundEffects2.length - 1];
    },

    playSoundEffect2(key, config) {
        if (!this.hasAudio(key)) {
            console.error(`[Sound manager] Audio key'${key}' is not existed`);
            return this;
        }

        var music = this.sound.add(key, {
            mute: GetValue(config, 'mute', this.soundEffects2Mute),
            volume: GetValue(config, 'volume', this.soundEffects2Volume),
            detune: GetValue(config, 'detune', 0),
            rate: GetValue(config, 'rate', 1),
        });

        this.soundEffects2.push(music);

        music
            .once('complete', function () {
                music.destroy();

                // SoundManager has been destroyed
                if (!this.sound) {
                    return;
                }
                RemoveItem(this.soundEffects2, music);
            }, this)
            .once('destroy', function () {
                // SoundManager has been destroyed
                if (!this.sound) {
                    return;
                }
                RemoveItem(this.soundEffects2, music);
            }, this)
            .play();

        return this;
    },

    stopAllSoundEffects2() {
        for (var i = this.soundEffects.length - 1; i >= 0; i--) {
            var soundEffect = this.soundEffects[i];
            soundEffect.stop();
            soundEffect.destroy();
        }

        return this;
    },

    fadeInSoundEffect2(time) {
        var soundEffect = this.getLastSoundEffect2();
        if (soundEffect) {
            FadeIn(soundEffect, time, this.soundEffects2Volume, 0);
        }

        return this;
    },

    fadeOutSoundEffect2(time, isStopped) {
        var soundEffect = this.getLastSoundEffect2();
        if (soundEffect) {
            FadeOut(soundEffect, time, isStopped);
        }

        return this;
    },

    fadeOutAllSoundEffects2(time, isStopped) {
        for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
            FadeOut(this.soundEffects2[i], time, isStopped);
        }

        return this;
    },

    setSoundEffect2Mute(mute, lastSoundEffect) {
        if (mute === undefined) {
            mute = true;
        }
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        if (lastSoundEffect) {
            // Set volume of last sound effect
            var soundEffect = this.getLastSoundEffect2();
            if (soundEffect) {
                soundEffect.setMute(mute);
            }

        } else {
            // Set volume of all sound effects
            this.soundEffects2Mute = mute;
        }

        return this;
    },

    setSoundEffect2Volume(volume, lastSoundEffect) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        if (lastSoundEffect) {
            // Set volume of last sound effect
            var soundEffect = this.getLastSoundEffect2();
            if (soundEffect) {
                soundEffect.setVolume(volume);
            }

        } else {
            // Set volume of all sound effects
            this.soundEffects2Volume = volume;
        }

        return this;
    },

    setSoundEffect2Detune(detune, lastSoundEffect) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        var soundEffects;
        if (lastSoundEffect) {
            soundEffects = [this.getLastSoundEffect2()];
        } else {
            soundEffects = this.soundEffects2;
        }

        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
            soundEffects[i].setDetune(detune);
        }

        return this;
    },

    setSoundEffect2Rate(rate, lastSoundEffect) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        var soundEffects;
        if (lastSoundEffect) {
            soundEffects = [this.getLastSoundEffect2()];
        } else {
            soundEffects = this.soundEffects2;
        }

        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
            soundEffects[i].setRate(rate);
        }

        return this;
    },
}