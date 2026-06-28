import Image from '../image/Image.js';
import AnmiationMethods from './AnmiationMethods.js';

import { Animations as PhaserAnimations } from 'phaser';
const AnimationState = PhaserAnimations.AnimationState;

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
    AnmiationMethods,
)

export default Sprite;