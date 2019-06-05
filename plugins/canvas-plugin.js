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
        var gameObject = new Canvas(this.scene, x, y, width, height);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    makeCanvas(config, addToScene) {
        var width = GetAdvancedValue(config, 'width', 256);
        var height = GetAdvancedValue(config, 'height', width);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var gameObject = new Canvas(this.scene, 0, 0, width, height);
        BuildGameObject(this.scene, gameObject, config);
        var fillColor = GetAdvancedValue(config, 'fill', null);
        gameObject.fill(fillColor);
        return gameObject;
    }
}

SetValue(window, 'RexPlugins.GameObjects.Canvas', Canvas);

export default CanvasPlugin;