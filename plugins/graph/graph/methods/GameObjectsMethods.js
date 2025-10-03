import IsLayerGameObject from '../../../utils/system/IsLayerGameObject.js';
import IsContainerGameObject from '../../../utils/system/IsContainerGameObject.js';
import IsGameObject from '../../../utils/system/IsGameObject.js';
import GetBoundsConfig from '../../../utils/bounds/GetBoundsConfig.js';
import { GetBounds } from '../../../utils/bounds/GetBounds.js';
import DrawBounds from '../../../utils/bounds/DrawBounds.js';

const MergeRect = Phaser.Geom.Rectangle.MergeRect;

export default {
    setGameObjectContainer(container) {
        this.container = container;  // p3Container, Layer, rexContainerLite
        return this;
    },

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

    addToContainer(container, fit) {
        if (container) {
            this.container = container;
        }

        var container = this.container;
        if (!container) {
            return this;
        }

        if (fit === undefined) {
            fit = false;
        }

        this.forEachGameObject(function (gameObject) {
            container.add(gameObject);
        })

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

    fitContainer(padding) {
        var container = this.container;
        if (!container) {
            return this;
        }

        // p3Container, Layer, rexContainerLite

        if (IsLayerGameObject(container)) {
            return this;
        }

        padding = GetBoundsConfig(padding);

        var bounds = this.getBounds();

        var width = bounds.width + padding.left + padding.right;
        var height = bounds.height + padding.top + padding.bottom;
        container.setSize(width, height);

        var offsetX = -(width * container.originX) + padding.left;
        var offsetY = -(height * container.originY) + padding.top;

        if (IsContainerGameObject(container)) {
            this.setGraphOffset(offsetX, offsetY);

        } else if (container.isRexContainerLite) {
            this.setGraphOffset(offsetX, offsetY);

            this.forEachGameObject(function (gameObject) {
                container.setChildLocalPosition(gameObject, gameObject.x, gameObject.y);
            })
        }

        return this;
    },


    drawBounds(graphics, config) {
        var gameObjects = [];
        this.getAllEdges(gameObjects);
        this.getAllNodes(gameObjects);
        DrawBounds(gameObjects, graphics, config);
        return this;
    },
}