'use strict'

import Canvas from './gameobjects/canvas/Canvas.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexCanvas', function (x, y, width, height) {
    return this.displayList.add(new Canvas(this.scene, x, y, width, height));
});
Phaser.GameObjects.GameObjectCreator.register('rexCanvas', function (config) {
    var width = GetValue(config, 'width', 256);
    var height = GetValue(config, 'height', 256);
    var canvas = new Canvas(this.scene, 0, 0, width, height);
    BuildGameObject(this.scene, canvas, config);
    var fillColor = GetValue(config, 'fill', null);
    canvas.fill(fillColor);
    return canvas;
});

export default Canvas;