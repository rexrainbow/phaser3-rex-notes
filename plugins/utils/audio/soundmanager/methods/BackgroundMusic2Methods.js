import FadeIn from '../../../../audio/fade/FadeIn.js';
import FadeOut from '../../../../audio/fade/FadeOut.js';

const GetValue = Phaser.Utils.Objects.GetValue;

export default {
    setBackgroundMusic2Loop(value) {
        if (value === undefined) {
            value = true;
        }

        this.backgroundMusic2Loop = value;
        return this;
    },

    setBackgroundMusic2FadeTime(time) {
        this.backgroundMusic2FadeTime = time;
        return this;
    },

    getBackgroundMusic2() {
        return this.backgroundMusic2;
    },

    // Internal method
    setCurrentBackgroundMusic2(music) {
        this.backgroundMusic2 = music;

        if (music) {
            music
                .once('complete', function () {
                    if (this.backgroundMusic2 === music) {
                        this.backgroundMusic2.destroy();
                        this.backgroundMusic2 = undefined;
                    }
                }, this)
                .once('destroy', function () {
                    if (this.backgroundMusic2 === music) {
                        this.backgroundMusic2 = undefined;
                    }
                }, this)

            if (!music.isPlaying) {
                music.play();
            }
        }
        return this;
    },

    playBackgroundMusic2(key, config) {
        if (!this.hasAudio(key)) {
            console.error(`[Sound manager] Audio key'${key}' is not existed`);
            return this;
        }

        // Don't re-play the same background music
        if (this.backgroundMusic2 && (this.backgroundMusic2.key === key)) {
            return this;
        }

        this.stopBackgroundMusic2(); // Stop previous background music

        var music = this.sound.add(key, {
            loop: GetValue(config, 'loop', this.backgroundMusicLoop),
            mute: GetValue(config, 'mute', this.backgroundMusic2Mute),
            volume: GetValue(config, 'volume', this.backgroundMusic2Volume),
            detune: GetValue(config, 'detune', 0),
            rate: GetValue(config, 'rate', 1),
        });

        this.setCurrentBackgroundMusic2(music);

        // Fade volume
        if (this.backgroundMusic2FadeTime > 0) {
            this.fadeInBackgroundMusic2(this.backgroundMusic2FadeTime);
        }
        return this;
    },

    pauseBackgroundMusic2() {
        if (this.backgroundMusic2) {
            this.backgroundMusic2.pause();
        }
        return this;
    },

    resumeBackgroundMusic2() {
        if (this.backgroundMusic2) {
            this.backgroundMusic2.resume();
        }
        return this;
    },

    stopBackgroundMusic2() {
        if (this.backgroundMusic2) {
            if (this.backgroundMusic2FadeTime > 0) {
                this.fadeOutBackgroundMusic2(this.backgroundMusic2FadeTime, true);

            } else {
                this.backgroundMusic2.stop();
                this.backgroundMusic2.destroy();
                this.backgroundMusic2 = undefined;
            }
        }
        return this;
    },

    fadeInBackgroundMusic2(time) {
        if (this.backgroundMusic2) {
            FadeIn(this.backgroundMusic2, time, this.backgroundMusic2Volume, 0);
        }

        return this;
    },

    fadeOutBackgroundMusic2(time, isStopped) {
        if (this.backgroundMusic2) {
            FadeOut(this.backgroundMusic2, time, isStopped);
        }

        return this;
    },

    crossFadeBackgroundMusic2(key, time) {
        if (!this.hasAudio(key)) {
            console.error(`[Sound manager] Audio key'${key}' is not existed`);
            return this;
        }

        var backgroundMusic2FadeTimeSave = this.backgroundMusic2FadeTime;
        this.backgroundMusic2FadeTime = 0;

        this
            .fadeOutBackgroundMusic2(time, true)
            .playBackgroundMusic2(key)
            .fadeInBackgroundMusic2(time);

        this.backgroundMusic2FadeTime = backgroundMusic2FadeTimeSave;

        return this;
    },

    setBackgroundMusic2Mute(mute) {
        if (mute === undefined) {
            mute = true;
        }

        this.backgroundMusic2Mute = mute;
        return this;
    },

    setBackgroundMusic2Volume(volume) {
        this.backgroundMusic2Volume = volume;
        return this;
    },

    setBackgroundMusic2Rate(rate) {
        if (this.backgroundMusic2) {
            this.backgroundMusic2.setRate(rate);
        }
        return this;
    },

    setBackgroundMusic2Detune(detune) {
        if (this.backgroundMusic2) {
            this.backgroundMusic2.setDetune(detune);
        }
        return this;
    },

}