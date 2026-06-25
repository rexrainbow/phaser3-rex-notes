import StencilLayer from './StencilLayer.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const BuildGameObject = PhaserGameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var children = GetAdvancedValue(config, 'children');

    var gameObject = new StencilLayer(this.scene, children);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};