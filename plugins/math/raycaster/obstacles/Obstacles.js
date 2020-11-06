import DestroyCallbackMethods from './DestroyCallbackMethods.js';
import IsGameObject from '../../../utils/system/IsGameObject.js';

const Polygon = Phaser.Geom.Polygon;
const SpliceOne = Phaser.Utils.Array.SpliceOne;

class Obstacles {
    constructor() {
        this.gameObjects = [];
        this.polygons = [];
    }

    contains(gameObject) {
        return (this.gameObjects.indexOf(gameObject) !== (-1));
    }

    clear() {
        this.removeDestroyCallback(this.gameObjects);
        this.gameObjects.length = 0;
        this.polygons.length = 0;
        return this;
    }

    add(gameObject, polygon) {
        if (this.contains(gameObject)) {
            return this;
        }

        if (IsGameObject(gameObject)) {
            if (polygon === undefined) {
                var p0 = gameObject.getTopLeft(),
                    p1 = gameObject.getTopRight(),
                    p2 = gameObject.getBottomRight(),
                    p3 = gameObject.getBottomLeft();
                polygon = new Polygon([p0, p1, p2, p3, p0]);
            }
        } else if (gameObject instanceof (Polygon)) {
            polygon = gameObject;
        }

        this.gameObjects.push(gameObject);
        this.polygons.push(polygon);

        this.addDestroyCallback(gameObject);
        return this;
    }

    get(index) {
        Obstacle.gameObject = this.gameObjects[index];
        Obstacle.polygon = this.polygons[index];
        return Obstacle;
    }

    remove(gameObject) {
        var index = this.gameObjects.indexOf(gameObject);
        if (index === (-1)) {
            return this;
        }

        SpliceOne(this.gameObjects, index);
        SpliceOne(this.polygon, index);

        this.removeDestroyCallback(gameObject);
        return this;
    }
}

var Obstacle = {};

Object.assign(
    Obstacles.prototype,
    DestroyCallbackMethods
)

export default Obstacles;