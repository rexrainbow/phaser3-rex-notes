import FadeIn from '../../../audio/fade/fadeIn.js';
import FadeOut from '../../../audio/fade/fadeOut.js';

class SoundManager {
    constructor(scene) {
        this.scene = scene;
        this.soundEffect = undefined;
        this.backgroundMusic = undefined;
    }

    destroy() {
        this.scene = undefined;

        if (this.soundEffect) {
            this.soundEffect.destroy();
            this.soundEffect = undefined;
        }

        if (this.backgroundMusic) {
            this.backgroundMusic.destroy();
            this.backgroundMusic = undefined;
        }
    }

    getSoundEffect() {
        return this.soundEffect;
    }

    playSoundEffect(key) {
        this.soundEffect = this.scene.sound.add(key);
        this.soundEffect
            .once('complete', function () {
                this.soundEffect.destroy();
                this.soundEffect = undefined;
            }, this)
            .once('destroy', function () {
                this.soundEffect = undefined;
            }, this)
            .play();
        return this;
    }

    setSoundEffectVolume(volume) {
        if (this.soundEffect) {
            this.soundEffect.setVolume(volume);
        }

        return this;
    }

    fadeInSoundEffect(time) {
        if (this.soundEffect) {
            FadeIn(this.scene, this.soundEffect, time);
        }

        return this;
    }

    fadeOutSoundEffect(time, isStopped) {
        if (this.soundEffect) {
            FadeOut(this.scene, this.soundEffect, time, isStopped);
        }

        return this;
    }

    playBackgroundMusic(key) {
        this.backgroundMusic = this.scene.sound.add(key);
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic
            .once('complete', function () {
                this.backgroundMusic.destroy();
                this.backgroundMusic = undefined;
            }, this)
            .once('destroy', function () {
                this.backgroundMusic = undefined;
            }, this)
            .play();
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
            this.backgroundMusic.stop();
            this.backgroundMusic.destroy();
            this.backgroundMusic = undefined;
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
        this
            .fadeOutBackgroundMusic(time, true)
            .playBackgroundMusic(key)
            .fadeInBackgroundMusic(time);

        return this;
    }

}

export default SoundManager;