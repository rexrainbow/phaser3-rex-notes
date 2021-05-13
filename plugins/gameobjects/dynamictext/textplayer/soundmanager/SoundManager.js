import FadeIn from '../../../../audio/fade/fadeIn.js';

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
        this.soundEffect.once('complete', function () {
            this.soundEffect.destroy();
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
}

export default SoundManager;