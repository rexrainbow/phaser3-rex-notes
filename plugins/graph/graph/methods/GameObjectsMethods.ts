
import IsGameObject from '../../../utils/system/IsGameObject';
import { GetBounds } from '../../../utils/bounds/GetBounds';
import DrawBounds from '../../../utils/bounds/DrawBounds';

import { Geom as PhaserGeom } from 'phaser';
const MergeRect = PhaserGeom.Rectangle.MergeRect;

export default {
    forEachGameObject(callback?: any) {
        var gameObjects = [];
        this.getAllEdges(gameObjects);
        this.getAllNodes(gameObjects);

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            if (!IsGameObject(gameObject)) {
                continue;
            }

            callback(gameObject)
        }

        return this;
    },

    setGraphOffset(x?: any, y?: any) {
        var dx = x - this.graphOffsetX;
        var dy = y - this.graphOffsetY;
        this.graphOffsetX = x;
        this.graphOffsetY = y;

        this.forEachGameObject(function(gameObject?: any) {
            if (dx !== 0) {
                gameObject.x += dx;
            }
            if (dy !== 0) {
                gameObject.y += dy;
            }
        })

        return this;
    },

    getBounds(out?: any) {
        if (out === undefined) {
            out = new PhaserGeom.Rectangle();
        }

        var firstBounds = true;
        var source = new PhaserGeom.Rectangle();
        this.forEachGameObject(function(gameObject?: any) {
            if (gameObject.getBounds) {
                source = GetBounds(gameObject, source);

                if (firstBounds?: any) {
                    out.setTo(source.x, source.y, source.width, source.height);
                    firstBounds = false;

                } else {
                    MergeRect(out, source);
                }
            }
        })

        return out;
    },

    drawBounds(graphics?: any, config?: any) {
        var gameObjects = [];
        this.getAllEdges(gameObjects);
        this.getAllNodes(gameObjects);
        DrawBounds(gameObjects, graphics, config);
        return this;
    },

    createInvisibleEdge() {
        return { $invisible: true };
    },

    isInvisibleEdge(edge?: any) {
        return !!edge.$invisible;
    },

    createDummyNode() {
        return { $dummy: true, width: 0, height: 0, }
    },

    isDummyNode(node?: any) {
        return !!node.$dummy;
    },
}