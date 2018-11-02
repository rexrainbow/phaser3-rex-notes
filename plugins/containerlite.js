import ContainerLite from './gameobjects/containerlite/ContainerLite.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexContainerLite', function (x, y, width, height, children) {
    var container = new ContainerLite(this.scene, x, y, width, height, children);
    this.displayList.add(container);
    return container;
});
Phaser.GameObjects.GameObjectCreator.register('rexContainerLite', function (config) {
    var width = GetAdvancedValue(config, 'width', 1);
    var height = GetAdvancedValue(config, 'height', width);
    var children = GetValue(config, 'children', undefined);
    var container = new ContainerLite(this.scene, 0, 0, width, height);

    // set properties wo modify children
    container.syncChildrenEnable = false;
    BuildGameObject(this.scene, container, config);
    // sync properties of children
    container.syncChildrenEnable = true;

    container.add(children);
    return container;
});

export default ContainerLite;