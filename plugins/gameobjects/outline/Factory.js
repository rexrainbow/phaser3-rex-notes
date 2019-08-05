import Outline from './Outline.js';

export default function (target, config) {
    var gameObject = new Outline(target, config);
    this.scene.add.existing(gameObject);
    return gameObject;
};