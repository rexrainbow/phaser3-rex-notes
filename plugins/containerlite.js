'use strict'

import ContainerLite from './gameobjects/containerlite/ContainerLite.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexContainerLite', function (x, y, width, height) {
    return this.displayList.add(new ContainerLite(this.scene, x, y, width, height));
});
Phaser.GameObjects.GameObjectCreator.register('rexContainerLite', function (config) {       
    var width = GetValue(config, 'width', 1);
    var height = GetValue(config, 'height', width);
    var containerLite = new ContainerLite(this.scene, 0, 0, width, height);
    BuildGameObject(this.scene, containerLite, config);
    return containerLite;
});

export default ContainerLite;