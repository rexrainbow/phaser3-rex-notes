import ContainerLite from './gameobjects/containerlite/ContainerLite.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexContainerLite', function (x, y, width, height, children) {
    var gameObject = new ContainerLite(this.scene, x, y, width, height, children);
    this.scene.add.existing(gameObject);
    return gameObject;
});
Phaser.GameObjects.GameObjectCreator.register('rexContainerLite', function (config) {
    var width = GetAdvancedValue(config, 'width', 1);
    var height = GetAdvancedValue(config, 'height', width);
    var children = GetValue(config, 'children', undefined);
    var gameObject = new ContainerLite(this.scene, 0, 0, width, height);

    // set properties wo modify children
    gameObject.syncChildrenEnable = false;
    BuildGameObject(this.scene, gameObject, config);
    // sync properties of children
    gameObject.syncChildrenEnable = true;

    gameObject.add(children);
    return gameObject;
});

export default ContainerLite;