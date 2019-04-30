import InputText from './gameobjects/inputtext/InputText.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexInputText', function (x, y, width, height, config) {
    var inputText = new InputText(this.scene, x, y, width, height, config);
    this.displayList.add(inputText);
    return inputText;
});
Phaser.GameObjects.GameObjectCreator.register('rexInputText', function (config, addToScene) {
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var inputText = new InputText(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, inputText, config);
    return inputText;
});

export default InputText;