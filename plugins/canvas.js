import Canvas from './gameobjects/canvas/Canvas.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexCanvas', function (x, y, width, height) {
    var gameObject = new Canvas(this.scene, x, y, width, height);
    this.scene.add.existing(gameObject);
    return gameObject;
});
Phaser.GameObjects.GameObjectCreator.register('rexCanvas', function (config, addToScene) {
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
});

export default Canvas;