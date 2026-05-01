import { Cameras, Geom, Utils, Plugins } from 'phaser';

const CameraClass = Cameras.Scene2D.BaseCamera;

var IsCameraObject = function (object) {
    return (object instanceof CameraClass);
};

const Rectangle = Geom.Rectangle;

var GetViewport = function (scene, camera, out) {
    if (!IsCameraObject(camera)) {
        out = camera;
        camera = undefined;
    }

    if (out === undefined) {
        out = new Rectangle();
    } else if (out === true) {
        out = globRect;
    }

    if (camera) {
        return scene.scale.getViewPort(camera, out);
    } else {
        return scene.scale.getViewPort(out);
    }
};

var globRect = new Rectangle();

const GetValue = Utils.Objects.GetValue;
const IsPlainObject = Utils.Objects.IsPlainObject;
const Circle = Geom.Circle;
const CircleToCircle = Geom.Intersects.CircleToCircle;

var RandomPlace = function (items, options) {
    if (items.length === 0) {
        return items;
    }

    var getPositionCallback = GetValue(options, 'getPositionCallback', undefined);
    if (getPositionCallback === undefined) {
        var area = GetValue(options, 'area', undefined);
        if (area === undefined) {
            var item0 = items[0], gameObject;
            if (IsPlainObject(item0)) {
                gameObject = item0.gameObject;
            } else {
                gameObject = item0;
            }
            area = GetViewport(gameObject.scene);
        }
        getPositionCallback = area.getRandomPoint.bind(area);
    }
    var defaultRadius = GetValue(options, 'radius', 0);

    var item, gameObject, radius;
    var collisionCircles = [];
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        item = items[i];
        if (IsPlainObject(item)) {
            gameObject = GetValue(item, 'gameObject', undefined);
            radius = GetValue(item, 'radius', defaultRadius);
        } else {
            gameObject = item;
            radius = defaultRadius;
        }

        if (!gameObject) {
            continue;
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

    return items;
};

class RandomPlacePlugin extends Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    randomPlace(items, options) {
        return RandomPlace(items, options);
    }
}

export { RandomPlacePlugin as default };
