class SoundManager {
    constructor(scene) {
        this.sound = scene.sound;
        this.soundEffect = undefined;
        this.backgroundMusic = undefined;
    }

    destroy() {
        this.soundEffect = undefined;
        this.backgroundMusic = undefined;
    }

    getSoundEffect() {
        return this.soundEffect;
    }

    playSoundEffect(key) {
        this.soundEffect = this.sound.add(key);
        this.soundEffect.once('complete', function () {
            this.soundEffect.destroy();
            this.soundEffect = undefined;
        }, this)
            .play();
        return this;
    }
}

export default SoundManager;