import Draw from '../../../utils/bounds/DrawBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var DrawBounds = function (graphics, config) {
    var drawContainer = GetValue(config, 'drawContainer', true);
    var gameObjects = this.getAllVisibleChildren([this]);
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        var gameObject = gameObjects[i];
        if (!drawContainer && gameObject.isRexContainerLite) {
            continue;
        }

        Draw(gameObject, graphics, config);
    }

    return this;
}

export default DrawBounds;