import BobBase from '../../gameobject/gomanager/bobbase/BobBase';

class SpriteBob extends BobBase {
    gameObject: any;
    timeScale: any;

    playAnimation(key?: any) {
        this.gameObject.anims.timeScale = this.timeScale;
        this.gameObject.play(key);
        return this;
    }

    stopAnimation() {
        this.gameObject.stop();
        return this;
    }

    chainAnimation(keys?: any) {
        this.gameObject.chain(keys);
        return this;
    }

    pauseAnimation() {
        this.gameObject.anims.pause();
        return this;
    }

    setTimeScale(timeScale?: any) {
        super.setTimeScale(timeScale);

        if (this.gameObject.anims) {
            this.gameObject.anims.timeScale = timeScale;
        }

        return this;
    }
}

export default SpriteBob;