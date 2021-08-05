import FadeIn from '../../../audio/fade/FadeIn.js';
import FadeOut from '../../../audio/fade/FadeOut.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveItem = Phaser.Utils.Array.Remove;

class SoundManager {
    constructor(scene, config) {
        this.scene = scene;

        // Sound effect will be destroyed when completed
        this.soundEffects = [];

        // Background music will be (fade out)destroyed when play next one.
        this.backgroundMusic = undefined;

        this.setBackgroundMusicLoopValue(GetValue(config, 'bgm.loop', true));
        this.setBackgroundMusicFadeTime(GetValue(config, 'bgm.fade', 500));

        var initialBackgroundMusic = GetValue(config, 'bgm.initial', undefined);
        if (initialBackgroundMusic) {
            this.setCurrentBackgroundMusic(initialBackgroundMusic);
        }
    }

    destroy(fromScene) {
        if (this.soundEffects.length && !fromScene) {
            for (var i = this.soundEffects.length - 1; i >= 0; i--) {
                this.soundEffects[i].destroy();
            }
        }
        this.soundEffects.length = 0;

        if (this.backgroundMusic && !fromScene) {
            this.backgroundMusic.destroy();
        }
        this.backgroundMusic = undefined;

        this.scene = undefined;
    }

    setBackgroundMusicLoopValue(value) {
        this.backgroundMusicLoopValue = value;
        return this;
    }

    setBackgroundMusicFadeTime(time) {
        this.backgroundMusicFadeTime = time;
        return this;
    }

    getSoundEffects() {
        return this.soundEffects;
    }

    getLastSoundEffect() {
        return this.soundEffects[this.soundEffects.length - 1];
    }

    getBackgroundMusic() {
        return this.backgroundMusic;
    }

    playSoundEffect(key) {
        var soundEffect = this.scene.sound.add(key);
        this.soundEffects.push(soundEffect);

        soundEffect
            .once('complete', function () {
                soundEffect.destroy();

                // SoundManager has been destroyed
                if (!this.scene) {
                    return;
                }
                RemoveItem(this.soundEffects, soundEffect);
            }, this)
            .once('destroy', function () {
                // SoundManager has been destroyed
                if (!this.scene) {
                    return;
                }
                RemoveItem(this.soundEffects, soundEffect);
            }, this)
            .play();

        return this;
    }

    setSoundEffectVolume(volume) {
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
            soundEffect.setVolume(volume);
        }

        return this;
    }

    fadeInSoundEffect(time) {
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
            FadeIn(this.scene, soundEffect, time);
        }

        return this;
    }

    fadeOutSoundEffect(time, isStopped) {
        var soundEffect = this.getLastSoundEffect();
        if (soundEffect) {
            FadeOut(this.scene, soundEffect, time, isStopped);
        }

        return this;
    }

    fadeOutAllSoundEffects(time, isStopped) {
        for (var i = this.soundEffects.length - 1; i >= 0; i--) {
            FadeOut(this.scene, this.soundEffects[i], time, isStopped);
        }

        return this;
    }

    setCurrentBackgroundMusic(music) {
        this.backgroundMusic = music;

        if (music) {
            music.setLoop(this.backgroundMusicLoopValue);
            music
                .once('complete', function () {
                    this.backgroundMusic.destroy();
                    this.backgroundMusic = undefined;
                }, this)
                .once('destroy', function () {
                    this.backgroundMusic = undefined;
                }, this)

            if (!music.isPlaying) {
                music.play();
            }
        }
    }

    playBackgroundMusic(key) {
        // Don't re-play the same background music
        if (this.backgroundMusic && (this.backgroundMusic.key === key)) {
            return this;
        }

        this.stopBackgroundMusic(); // Stop previous background music

        this.setCurrentBackgroundMusic(this.scene.sound.add(key));

        if (this.backgroundMusicFadeTime > 0) {
            this.fadeInBackgroundMusic(this.backgroundMusicFadeTime);
        }
        return this;
    }

    pauseBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
        return this;
    }

    resumeBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.resume();
        }
        return this;
    }

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
    }

    fadeInBackgroundMusic(time) {
        if (this.backgroundMusic) {
            FadeIn(this.scene, this.backgroundMusic, time);
        }

        return this;
    }

    fadeOutBackgroundMusic(time, isStopped) {
        if (this.backgroundMusic) {
            FadeOut(this.scene, this.backgroundMusic, time, isStopped);
        }

        return this;
    }

    crossFadeBackgroundMusic(key, time) {
        var backgroundMusicFadeTimeSave = this.backgroundMusicFadeTime;
        this.backgroundMusicFadeTime = 0;

        this
            .fadeOutBackgroundMusic(time, true)
            .playBackgroundMusic(key)
            .fadeInBackgroundMusic(time);

        this.backgroundMusicFadeTime = backgroundMusicFadeTimeSave;

        return this;
    }

}

export default SoundManager;