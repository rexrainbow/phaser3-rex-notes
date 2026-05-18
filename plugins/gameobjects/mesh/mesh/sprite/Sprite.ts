import Image from '../image/Image';
import Methods from './methods/Methods';

import { Animations as PhaserAnimations } from 'phaser';
const AnimationState = PhaserAnimations.AnimationState;

class Sprite extends Image {
    anims: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, texture?: any, frame?: any) {
        super(scene, x, y, texture, frame);
        this.type = 'rexMeshSprite';

        this.anims = new AnimationState(this);
    }

    preUpdate(time?: any, delta?: any) {
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