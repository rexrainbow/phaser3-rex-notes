(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexgridcutimageplugin = factory());
})(this, (function () { 'use strict';

    var GetFrameNameCallback = function (baseFrameName, delimiter) {
        if (typeof (baseFrameName) === 'object') {
            baseFrameName = baseFrameName.name;
        }

        if (delimiter === undefined) {
            delimiter = ',';
        }

        var callback;
        if (baseFrameName === '__BASE') {
            callback = function (colIndex, rowIndex) {
                return `${colIndex}${delimiter}${rowIndex}`;
            };
        } else {
            callback = function (colIndex, rowIndex) {
                return `${baseFrameName}_${colIndex}${delimiter}${rowIndex}`;
            };
        }

        return callback;
    };

    var GenerateFrames = function (scene, key, frame, columns, rows, getFrameNameCallback) {
        if (frame == null) {
            frame = '__BASE';
        }

        if (!getFrameNameCallback) {
            getFrameNameCallback = GetFrameNameCallback(frame, getFrameNameCallback);
        }

        var texture = scene.sys.textures.get(key);
        var baseFrame = (typeof (frame) === 'object') ? frame : texture.get(frame);

        var baseWidth = baseFrame.width,
            baseHeight = baseFrame.height;

        var cellX, cellY, cellName;
        var cellWidth = baseWidth / columns,
            cellHeight = baseHeight / rows;

        var frameCutX = baseFrame.cutX,
            frameCutY = baseFrame.cutY;
        var offsetX = 0,
            offsetY = 0;
        for (var y = 0; y < rows; y++) {
            offsetX = 0;
            for (var x = 0; x < columns; x++) {
                cellName = getFrameNameCallback(x, y);

                cellX = offsetX + frameCutX;
                cellY = offsetY + frameCutY;

                texture.add(
                    cellName, 0,
                    cellX, cellY,
                    cellWidth, cellHeight
                );

                offsetX += cellWidth;
            }
            offsetY += cellHeight;
        }

        return {
            getFrameNameCallback: getFrameNameCallback,
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            columns: columns,
            rows: rows
        }
    };

    const GetValue = Phaser.Utils.Objects.GetValue;
    const DefaultImageClass = Phaser.GameObjects.Image;
    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const RotateAround = Phaser.Math.RotateAround;

    var GridCutImage = function (gameObject, columns, rows, config) {
        if (IsPlainObject(columns)) {
            config = columns;
            columns = GetValue(config, 'columns', 1);
            rows = GetValue(config, 'rows', 1);
        }

        var createImageCallback = GetValue(config, 'createImageCallback');
        if (!createImageCallback) {
            var ImageClass = GetValue(config, 'ImageClass', DefaultImageClass);
            createImageCallback = function (scene, key, frame) {
                return new ImageClass(scene, 0, 0, key, frame);
            };
        }

        var originX = GetValue(config, 'originX', 0.5);
        var originY = GetValue(config, 'originY', 0.5);

        var addToScene = GetValue(config, 'add', true);

        var align = GetValue(config, 'align', addToScene);

        var imageObjectPool = GetValue(config, 'objectPool', undefined);

        var scene = gameObject.scene;
        var texture = gameObject.texture;
        var frame = gameObject.frame;

        var result = GenerateFrames(scene, texture, frame, columns, rows);
        var getFrameNameCallback = result.getFrameNameCallback;
        var scaleX = gameObject.scaleX,
            scaleY = gameObject.scaleY;
        var rotation = gameObject.rotation;
        var topLeft = gameObject.getTopLeft(),
            startX = topLeft.x,
            startY = topLeft.y;

        var cellGameObjects = [];
        var scaleCellWidth = result.cellWidth * scaleX,
            scaleCellHeight = result.cellHeight * scaleY;
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < columns; x++) {
                var cellGameObject;

                var frameName = getFrameNameCallback(x, y);
                if (imageObjectPool && (imageObjectPool.length > 0)) {
                    cellGameObject = (imageObjectPool.pop()).setTexture(texture, frameName);
                } else {
                    cellGameObject = createImageCallback(scene, texture, frameName);
                }

                if (addToScene) {
                    scene.add.existing(cellGameObject);
                }

                if (align) {
                    var cellTLX = startX + (scaleCellWidth * x);
                    var cellTLY = startY + (scaleCellHeight * y);
                    var cellX = cellTLX + (originX * scaleCellWidth);
                    var cellY = cellTLY + (originY * scaleCellHeight);

                    cellGameObject
                        .setOrigin(originX, originY)
                        .setPosition(cellX, cellY)
                        .setScale(scaleX, scaleY)
                        .setRotation(rotation);
                    RotateAround(cellGameObject, startX, startY, rotation);
                }

                cellGameObjects.push(cellGameObject);
            }
        }

        return cellGameObjects;
    };

    class GridCutImagePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        gridCut(gameObject, columns, rows, config) {
            return GridCutImage(gameObject, columns, rows, config);
        }
    }

    return GridCutImagePlugin;

}));
