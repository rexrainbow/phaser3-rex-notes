import SkewRenderTexture from './SkewRenderTexture.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const BuildGameObject = PhaserGameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', 32);
    var height = GetAdvancedValue(config, 'height', 32);
    var gameObject = new SkewRenderTexture(this.scene, 0, 0, width, height);
    BuildGameObject(this.scene, gameObject, config);

    return gameObject;
}