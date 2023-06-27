import TransitionImagePack from './TransitionImagePack.js';

export default function (x, y, texture, frame, config) {
    var gameObject = new TransitionImagePack(this.scene, x, y, texture, frame, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};