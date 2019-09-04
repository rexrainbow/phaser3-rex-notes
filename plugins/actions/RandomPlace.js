import GetDefaultBounds from '../utils/defaultbounds/GetDefaultBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const Circle = Phaser.Geom.Circle;
const CircleToCircle = Phaser.Geom.Intersects.CircleToCircle;

var RandomPlace = function (items, options) {
    if (items.length === 0) {
        return;
    }

    var getPositionCallback = GetValue(options, 'getPosition', undefined);
    if (getPositionCallback === undefined) {
        var area = GetValue(options, 'area', undefined);
        if (area === undefined) {
            var scene = items[0].scene;
            area = GetDefaultBounds(scene);
        }
        getPositionCallback = area.getRandomPoint.bind(area);
    }
    var defaultRadius = GetValue(options, 'radius', 0);

    var item;
    var radius, collisionCircles = [];
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        item = items[i];
        if (IsPlainObject(item)) {
            radius = GetValue(item, 'radius', defaultRadius);
            item = GetValue(item, 'radius', undefined);
        } else {
            radius = defaultRadius;
        }

        if (radius <= 0) {
            getPositionCallback(item);
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
            item.setPosition(circle.x, circle.y);
        }
    }

    return items;
}

export default RandomPlace;