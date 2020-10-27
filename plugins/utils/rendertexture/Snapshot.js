import GetBoundsOfGameObjects from '../bounds/GetBoundsOfGameObjects.js';
import Clone from '../object/Clone.js';
import SortGameObjectsByDepth from '../system/SortGameObjectsByDepth.js';

var Snapshot = function (gameObjects, renderTexture, ox, oy) {
    if (gameObjects.length === 0) {
        return renderTexture;
    }

    var scene = gameObjects[0].scene;
    var bounds = GetBoundsOfGameObjects(gameObjects, true);

    var isCenterOrigin = (ox !== undefined) && (oy !== undefined);
    var x, y, width, height, origin;
    if (isCenterOrigin) {
        var halfWidth = Math.max((ox - bounds.left), (bounds.right - ox));
        var halfHeight = Math.max((oy - bounds.top), (bounds.bottom - oy));
        x = ox - halfWidth;
        y = oy - halfHeight;
        width = halfWidth * 2;
        height = halfHeight * 2;
        origin = 0.5;
    } else {
        x = bounds.x;
        y = bounds.y;
        width = bounds.width;
        height = bounds.height;
        origin = 0;
    }

    if (!renderTexture) {
        renderTexture = scene.add.renderTexture(x, y, width, height);
    } else {
        renderTexture.setPosition(x, y).setSize(width, height)
    }
    renderTexture.setOrigin(origin);

    renderTexture.camera.setPosition(-bounds.x, -bounds.y);
    gameObjects = SortGameObjectsByDepth(Clone(gameObjects));
    renderTexture.draw(gameObjects);

    return renderTexture;
}

export default Snapshot;