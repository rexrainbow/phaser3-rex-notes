import Canvas from './gameobjects/canvas/Canvas.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexCanvas', function (x, y, width, height) {
    var canvas = new Canvas(this.scene, x, y, width, height);
    this.displayList.add(canvas);
    return canvas;
});
Phaser.GameObjects.GameObjectCreator.register('rexCanvas', function (config, addToScene) {
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
});

export default Canvas;