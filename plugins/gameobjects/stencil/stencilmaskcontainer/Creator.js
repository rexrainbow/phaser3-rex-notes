import StencilMaskContainer from './StencilMaskContainer.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const BuildGameObject = PhaserGameObjects.BuildGameObject;
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }

    var x = GetAdvancedValue(config, 'x', 0);
    var y = GetAdvancedValue(config, 'y', 0);
    var children = GetAdvancedValue(config, 'children');
    var gameObject = new StencilMaskContainer(this.scene, x, y, children, config);

    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};
