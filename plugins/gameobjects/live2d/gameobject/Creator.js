import Live2dGameObject from './Live2dGameObject.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const BuildGameObject = PhaserGameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var key = GetAdvancedValue(config, 'key');
    var gameObject = new Live2dGameObject(this.scene, 0, 0, key);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};