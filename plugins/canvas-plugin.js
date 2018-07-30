'use strict'

import Canvas from './gameobjects/canvas/Canvas.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class CanvasPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCanvas', this.addCanvas, this.makeCanvas);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addCanvas(x, y, width, height) {
        return this.displayList.add(new Canvas(this.scene, x, y, width, height));
    }

    makeCanvas(config) {
        var width = GetValue(config, 'width', 256);
        var height = GetValue(config, 'height', width);
        var canvas = new Canvas(this.scene, 0, 0, width, height);
        BuildGameObject(this.scene, canvas, config);
        var fillColor = GetValue(config, 'fill', null);
        canvas.fill(fillColor);
        return canvas;
    }

    getClass() {
        return Canvas;
    }
}

export default CanvasPlugin;