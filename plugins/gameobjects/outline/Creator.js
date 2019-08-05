import Outline from './Outline.js';

const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (target, config) {
    var gameObject = new Outline(target, config);

    // set properties wo modify children
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
}