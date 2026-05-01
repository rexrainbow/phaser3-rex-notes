import NinePatch from './NinePatch.js';

import { GameObjects as PhaserGameObjects } from 'phaser';
const BuildGameObject = PhaserGameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new NinePatch(this.scene, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};