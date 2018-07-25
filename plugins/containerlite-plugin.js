'use strict'

import ContainerLite from './gameobjects/containerlite/ContainerLite.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class ContainerLitePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexContainerLite', this.addContainer, this.makeContainer);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addContainer(x, y, width, height) {
        return this.displayList.add(new ContainerLite(this.scene, x, y, width, height));
    }

    makeContainer(config) {      
        var width = GetValue(config, 'width', 1);
        var height = GetValue(config, 'height', width);
        var containerLite = new ContainerLite(this.scene, 0, 0, width, height);
        BuildGameObject(this.scene, containerLite, config);
        return containerLite;
    }

}

export default ContainerLitePlugin;