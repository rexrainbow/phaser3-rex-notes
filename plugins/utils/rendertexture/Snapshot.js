import GetBoundsOfGameObjects from '../bounds/GetBoundsOfGameObjects.js';
import Clone from '../object/Clone.js';
import SortGameObjectsByDepth from '../system/SortGameObjectsByDepth.js';

var GetValue = Phaser.Utils.Objects.GetValue;

var Snapshot = function (config) {
    var gameObjects = config.gameObjects;
    var renderTexture = config.renderTexture;
    if (gameObjects.length === 0) {
        if (renderTexture) {
            renderTexture.setSize(1, 1).clear();
        }
        return renderTexture;
    }

    var x = GetValue(config, 'x', undefined);
    var y = GetValue(config, 'y', undefined);
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);
    var originX = GetValue(config, 'originX', 0);
    var originY = GetValue(config, 'originY', 0);
    var scrollX, scrollY;
    if ((width === undefined) || (height === undefined) || (x === undefined) || (y === undefined)) {
        // Union bounds of gameObjects
        var bounds = GetBoundsOfGameObjects(gameObjects, true);
        var isCenterOrigin = (x !== undefined) && (y !== undefined);
        if (isCenterOrigin) {
            width = Math.max((x - bounds.left), (bounds.right - x)) * 2;
            height = Math.max((y - bounds.top), (bounds.bottom - y)) * 2;
            originX = 0.5;
            originY = 0.5;
        } else {
            x = bounds.x;
            y = bounds.y;
            width = bounds.width;
            height = bounds.height;
            originX = 0;
            originY = 0;
        }
        scrollX = bounds.x;
        scrollY = bounds.y;
    } else {
        scrollX = x + ((0 - originX) * width);
        scrollY = y + ((0 - originY) * height);
    }

    // Configurate render texture
    if (!renderTexture) {
        var scene = gameObjects[0].scene;
        renderTexture = scene.add.renderTexture(x, y, width, height);
    } else {
        renderTexture.setPosition(x, y)
        if ((renderTexture.width !== width) || (renderTexture.height !== height)) {
            renderTexture.setSize(width, height);
        }
    }
    renderTexture.setOrigin(originX, originY);
    renderTexture.camera.setScroll(scrollX, scrollY);

    // Draw gameObjects
    gameObjects = SortGameObjectsByDepth(Clone(gameObjects));
    renderTexture.draw(gameObjects);

    return renderTexture;
}

export default Snapshot;