import FadeIn from '../../../../audio/fade/FadeIn';
import FadeOut from '../../../../audio/fade/FadeOut';

import { Utils as PhaserUtils } from 'phaser';
const RemoveItem = PhaserUtils.Array.Remove;
const GetValue = PhaserUtils.Objects.GetValue;

export default {

    getSoundEffects2() {
        return this.soundEffects2;
    },

    getLastSoundEffect2() {
        return this.soundEffects2[this.soundEffects2.length - 1];
    },

    playSoundEffect2(key?: any, config?: any) {
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
            .once('complete', function() {
                music.destroy();

                // SoundManager has been destroyed
                if (!this.sound) {
                    return;
                }
                RemoveItem(this.soundEffects2, music);
            }, this)
            .once('destroy', function() {
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

    fadeInSoundEffect2(time?: any) {
        var soundEffect = this.getLastSoundEffect2();
        if (soundEffect?: any) {
            FadeIn(soundEffect, time, this.soundEffects2Volume, 0);
        }

        return this;
    },

    fadeOutSoundEffect2(time?: any, isStopped?: any) {
        var soundEffect = this.getLastSoundEffect2();
        if (soundEffect?: any) {
            FadeOut(soundEffect, time, isStopped);
        }

        return this;
    },

    fadeOutAllSoundEffects2(time?: any, isStopped?: any) {
        for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
            FadeOut(this.soundEffects2[i], time, isStopped);
        }

        return this;
    },

    setSoundEffect2Mute(mute?: any, lastSoundEffect?: any) {
        if (mute === undefined) {
            mute = true;
        }
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        if (lastSoundEffect?: any) {
            // Set volume of last sound effect
            var soundEffect = this.getLastSoundEffect2();
            if (soundEffect?: any) {
                soundEffect.setMute(mute);
            }

        } else {
            // Set volume of all sound effects
            this.soundEffects2Mute = mute;
        }

        return this;
    },

    setSoundEffect2Volume(volume?: any, lastSoundEffect?: any) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        if (lastSoundEffect?: any) {
            // Set volume of last sound effect
            var soundEffect = this.getLastSoundEffect2();
            if (soundEffect?: any) {
                soundEffect.setVolume(volume);
            }

        } else {
            // Set volume of all sound effects
            this.soundEffects2Volume = volume;
        }

        return this;
    },

    setSoundEffect2Detune(detune?: any, lastSoundEffect?: any) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        var soundEffects;
        if (lastSoundEffect?: any) {
            soundEffects = [this.getLastSoundEffect2()];
        } else {
            soundEffects = this.soundEffects2;
        }

        for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
            soundEffects[i].setDetune(detune);
        }

        return this;
    },

    setSoundEffect2Rate(rate?: any, lastSoundEffect?: any) {
        if (lastSoundEffect === undefined) {
            lastSoundEffect = false;
        }

        var soundEffects;
        if (lastSoundEffect?: any) {
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