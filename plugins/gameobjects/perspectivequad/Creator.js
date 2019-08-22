import PerspectiveQuad from './PerspectiveQuad.js';

const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new PerspectiveQuad(this.scene, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};