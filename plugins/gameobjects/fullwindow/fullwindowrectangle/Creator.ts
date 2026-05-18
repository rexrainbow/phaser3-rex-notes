import FullWindowRectangle from './FullWindowRectangle';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const BuildGameObject = PhaserGameObjects.BuildGameObject;

export default function(config?: any, addToScene?: any) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var fillColor = GetAdvancedValue(config, 'color', undefined);
    var fillAlpha = GetAdvancedValue(config, 'alpha', undefined);
    var gameObject = new FullWindowRectangle(this.scene, fillColor, fillAlpha);

    BuildGameObject(this.scene, gameObject, config);

    return gameObject;
}