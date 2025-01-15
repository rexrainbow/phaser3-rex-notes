import Image from '../image/Image.js';
import Methods from './methods/Methods.js';

const AnimationState = Phaser.Animations.AnimationState;

class Sprite extends Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.type = 'rexMeshSprite';

        this.anims = new AnimationState(this);
    }

    preUpdate(time, delta) {
        this.anims.update(time, delta);
    }

    preDestroy() {
        this.anims.destroy();

        this.anims = undefined;
    }
}

Object.assign(
    Sprite.prototype,
    Methods,
)

export default Sprite;