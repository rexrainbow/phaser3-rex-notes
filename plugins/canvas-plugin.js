import Canvas from './gameobjects/canvas/Canvas.js';
import SetValue from './utils/object/SetValue.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
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
        var canvas = new Canvas(this.scene, x, y, width, height);
        this.displayList.add(canvas);
        return canvas;
    }

    makeCanvas(config, addToScene) {
        var width = GetAdvancedValue(config, 'width', 256);
        var height = GetAdvancedValue(config, 'height', width);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var canvas = new Canvas(this.scene, 0, 0, width, height);
        BuildGameObject(this.scene, canvas, config);
        var fillColor = GetAdvancedValue(config, 'fill', null);
        canvas.fill(fillColor);
        return canvas;
    }
}

SetValue(window, 'RexPlugins.GameObjects.Canvas', Canvas);

export default CanvasPlugin;