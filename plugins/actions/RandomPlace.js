import GetDefaultBounds from '../utils/defaultbounds/GetDefaultBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const Circle = Phaser.Geom.Circle;
const CircleToCircle = Phaser.Geom.Intersects.CircleToCircle;

var RandomPlace = function (gameObjects, options) {
    if (gameObjects.length === 0) {
        return gameObjects;
    }

    var getPositionCallback = GetValue(options, 'getPositionCallback', undefined);
    if (getPositionCallback === undefined) {
        var area = GetValue(options, 'area', undefined);
        if (area === undefined) {
            var scene = gameObjects[0].scene;
            area = GetDefaultBounds(scene);
        }
        getPositionCallback = area.getRandomPoint.bind(area);
    }
    var defaultRadius = GetValue(options, 'radius', 0);

    var gameObject, radius, collisionCircles = [];
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (IsPlainObject(gameObject)) {
            radius = GetValue(gameObject, 'radius', defaultRadius);
            gameObject = GetValue(gameObject, 'gameObject', undefined);
        } else {
            radius = defaultRadius;
        }

        if (radius <= 0) {
            getPositionCallback(gameObject);
        } else {
            var circle = new Circle(0, 0, radius);
            var isOverlapping;
            do {
                getPositionCallback(circle);
                isOverlapping = false;
                for (var ci = 0, ccnt = collisionCircles.length; ci < ccnt; ci++) {
                    isOverlapping = CircleToCircle(circle, collisionCircles[ci]);
                    if (isOverlapping) {
                        break;
                    }
                }
            } while (isOverlapping)

            collisionCircles.push(circle);
            gameObject.setPosition(circle.x, circle.y);
        }
    }

    return gameObjects;
}

export default RandomPlace;