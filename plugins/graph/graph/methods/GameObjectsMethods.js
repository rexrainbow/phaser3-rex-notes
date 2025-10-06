
import IsGameObject from '../../../utils/system/IsGameObject.js';
import { GetBounds } from '../../../utils/bounds/GetBounds.js';
import DrawBounds from '../../../utils/bounds/DrawBounds.js';

const MergeRect = Phaser.Geom.Rectangle.MergeRect;

export default {
    forEachGameObject(callback) {
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

    setGraphOffset(x, y) {
        var dx = x - this.graphOffsetX;
        var dy = y - this.graphOffsetY;
        this.graphOffsetX = x;
        this.graphOffsetY = y;

        this.forEachGameObject(function (gameObject) {
            if (dx !== 0) {
                gameObject.x += dx;
            }
            if (dy !== 0) {
                gameObject.y += dy;
            }
        })

        return this;
    },

    getBounds(out) {
        if (out === undefined) {
            out = new Phaser.Geom.Rectangle();
        }

        var firstBounds = true;
        var source = new Phaser.Geom.Rectangle();
        this.forEachGameObject(function (gameObject) {
            if (gameObject.getBounds) {
                source = GetBounds(gameObject, source);

                if (firstBounds) {
                    out.setTo(source.x, source.y, source.width, source.height);
                    firstBounds = false;

                } else {
                    MergeRect(out, source);
                }
            }
        })

        return out;
    },

    drawBounds(graphics, config) {
        var gameObjects = [];
        this.getAllEdges(gameObjects);
        this.getAllNodes(gameObjects);
        DrawBounds(gameObjects, graphics, config);
        return this;
    },

    createNullEdge() {
        return { $invisible: true };
    },

    isNullEdge(edge) {
        return !!edge.$invisible;
    },

    createNullNode() {
        return { $dummy: true, width: 0, height: 0, }
    },

    isNullNode(node) {
        return !!node.$dummy;
    },
}