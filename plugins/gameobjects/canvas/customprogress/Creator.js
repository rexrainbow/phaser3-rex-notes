import CustomProgress from './CustomProgress.js';

const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new CustomProgress(this.scene, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};