import IsGameObject from '../../utils/system/IsGameObject';
import BoundsToPolygon from '../../utils/bounds/BoundsToPolygon';

import { Geom as PhaserGeom, Utils as PhaserUtils } from 'phaser';
const Polygon = PhaserGeom.Polygon;
const SpliceOne = PhaserUtils.Array.SpliceOne;

class Obstacles {
    gameObjects: any;
    polygons: any;

    constructor() {
        this.gameObjects = [];
        this.polygons = [];
    }

    contains(gameObject?: any) {
        return (this.gameObjects.indexOf(gameObject) !== (-1));
    }

    get(index?: any) {
        Obstacle.gameObject = this.gameObjects[index];
        Obstacle.polygon = this.polygons[index];
        return Obstacle;
    }

    addDestroyCallback(gameObject?: any) {
        if (Array.isArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.addDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.on) {
            gameObject.once('destroy', this.onChildDestroy, this);
        }
        return this;
    }

    removeDestroyCallback(gameObject?: any) {
        if (Array.isArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.removeDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.off) {
            gameObject.off('destroy', this.onChildDestroy, this);
        }
        return this;
    }

    clear() {
        this.removeDestroyCallback(this.gameObjects);
        this.gameObjects.length = 0;
        this.polygons.length = 0;
        return this;
    }

    add(gameObject?: any, polygon?: any) {
        if (this.contains(gameObject)) {
            return this;
        }

        if (IsGameObject(gameObject)) {
            if (polygon === undefined) {
                polygon = BoundsToPolygon(gameObject);
            }
        } else if (gameObject instanceof (Polygon)) {
            polygon = gameObject;
        }

        this.gameObjects.push(gameObject);
        this.polygons.push(polygon);

        this.addDestroyCallback(gameObject);
        return this;
    }

    remove(gameObject?: any) {
        var index = this.gameObjects.indexOf(gameObject);
        if (index === (-1)) {
            return this;
        }

        SpliceOne(this.gameObjects, index);
        SpliceOne(this.polygons, index);

        this.removeDestroyCallback(gameObject);
        return this;
    }

    onChildDestroy(child?: any, fromScene?: any) {
        this.remove(child);
    }

    update(gameObject?: any, polygon?: any) {
        var index = this.gameObjects.indexOf(gameObject);
        if (index === (-1)) {
            return this;
        }
        if (polygon === undefined) {
            polygon = BoundsToPolygon(gameObject, this.polygons[index]);
        }
        this.polygons[index] = polygon;
        return this;
    }
}

var Obstacle = {};

export default Obstacles;