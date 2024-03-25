import FadeIn from '../../../../audio/fade/FadeIn.js';
import FadeOut from '../../../../audio/fade/FadeOut.js';

const GetValue = Phaser.Utils.Objects.GetValue;

export default {
    setBackgroundMusicLoop(value) {
        if (value === undefined) {
            value = true;
        }

        this.backgroundMusicLoop = value;
        return this;
    },

    setBackgroundMusicFadeTime(time) {
        this.backgroundMusicFadeTime = time;
        return this;
    },

    getBackgroundMusic() {
        return this.backgroundMusic;
    },

    // Internal method
    setCurrentBackgroundMusic(music) {
        this.backgroundMusic = music;

        if (music) {
            music
                .once('complete', function () {
                    if (this.backgroundMusic === music) {
                        this.backgroundMusic.destroy();
                        this.backgroundMusic = undefined;
                    }
                }, this)
                .once('destroy', function () {
                    if (this.backgroundMusic === music) {
                        this.backgroundMusic = undefined;
                    }
                }, this)

            if (!music.isPlaying) {
                music.play();
            }
        }
        return this;
    },

    playBackgroundMusic(key, config) {
        if (!this.hasAudio(key)) {
            console.error(`[Sound manager] Audio key'${key}' is not existed`);
            return this;
        }

        // Don't re-play the same background music
        if (this.backgroundMusic && (this.backgroundMusic.key === key)) {
            return this;
        }

        this.stopBackgroundMusic(); // Stop previous background music

        var music = this.sound.add(key, {
            loop: GetValue(config, 'loop', this.backgroundMusicLoop),
            mute: GetValue(config, 'mute', this.backgroundMusicMute),
            volume: GetValue(config, 'volume', this.backgroundMusicVolume),
            detune: GetValue(config, 'detune', 0),
            rate: GetValue(config, 'rate', 1),
        });

        this.setCurrentBackgroundMusic(music);

        // Fade volume
        if (this.backgroundMusicFadeTime > 0) {
            this.fadeInBackgroundMusic(this.backgroundMusicFadeTime);
        }
        return this;
    },

    pauseBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
        return this;
    },

    resumeBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.resume();
        }
        return this;
    },

    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            if (this.backgroundMusicFadeTime > 0) {
                this.fadeOutBackgroundMusic(this.backgroundMusicFadeTime, true);

            } else {
                this.backgroundMusic.stop();
                this.backgroundMusic.destroy();
                this.backgroundMusic = undefined;
            }
        }
        return this;
    },

    fadeInBackgroundMusic(time) {
        if (this.backgroundMusic) {
            FadeIn(this.backgroundMusic, time, this.backgroundMusicVolume, 0);
        }

        return this;
    },

    fadeOutBackgroundMusic(time, isStopped) {
        if (this.backgroundMusic) {
            FadeOut(this.backgroundMusic, time, isStopped);
        }

        return this;
    },

    crossFadeBackgroundMusic(key, time) {
        if (!this.hasAudio(key)) {
            console.error(`[Sound manager] Audio key'${key}' is not existed`);
            return this;
        }

        var backgroundMusicFadeTimeSave = this.backgroundMusicFadeTime;
        this.backgroundMusicFadeTime = 0;

        this
            .fadeOutBackgroundMusic(time, true)
            .playBackgroundMusic(key)
            .fadeInBackgroundMusic(time);

        this.backgroundMusicFadeTime = backgroundMusicFadeTimeSave;

        return this;
    },

    setBackgroundMusicMute(mute) {
        if (mute === undefined) {
            mute = true;
        }

        this.backgroundMusicMute = mute;
        return this;
    },


    setBackgroundMusicVolume(volume) {
        this.backgroundMusicVolume = volume;
        return this;
    },

    setBackgroundMusicRate(rate) {
        if (this.backgroundMusic) {
            this.backgroundMusic.setRate(rate);
        }
        return this;
    },

    setBackgroundMusicDetune(detune) {
        if (this.backgroundMusic) {
            this.backgroundMusic.setDetune(detune);
        }
        return this;
    },



}