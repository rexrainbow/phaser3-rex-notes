import Sprite from './Sprite.js';

export default function (x, y, texture, frame) {
    var gameObject = new Sprite(this.scene, x, y, texture, frame);
    this.scene.add.existing(gameObject);
    return gameObject;
};