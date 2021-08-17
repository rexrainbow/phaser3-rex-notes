import TransitionImage from './TransitionImage.js';

export default function (x, y, texture, frame) {
    var gameObject = new TransitionImage(this.scene, x, y, texture, frame);
    this.scene.add.existing(gameObject);
    return gameObject;
};