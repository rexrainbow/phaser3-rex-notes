import ShatterImage from './ShatterImage.js';

export default function (x, y, texture, frame, config) {
    var gameObject = new ShatterImage(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};