import CustomProgress from './CustomProgress';

import { GameObjects as PhaserGameObjects } from 'phaser';
const BuildGameObject = PhaserGameObjects.BuildGameObject;

export default function(config?: any, addToScene?: any) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new CustomProgress(this.scene, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};