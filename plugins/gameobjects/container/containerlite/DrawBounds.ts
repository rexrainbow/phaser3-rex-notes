import Draw from '../../../utils/bounds/DrawBounds';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var DrawBounds = function(graphics?: any, config?: any) {
    var drawContainer = GetValue(config, 'drawContainer', true);

    var gameObjects = GetValue(config, 'children');
    if (gameObjects === undefined) {
        gameObjects = this.getAllVisibleChildren([this]);
    }

    if (!drawContainer) {
        gameObjects = gameObjects.filter(function(gameObject?: any) {
            return !gameObject.isRexContainerLite;
        })
    }

    Draw(gameObjects, graphics, config);

    return this;
}

export default DrawBounds;