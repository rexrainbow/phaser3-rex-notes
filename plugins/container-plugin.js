'use strict'

import Container from './gameobjects/container/Container.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class ContainerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexContainer', this.addContainer, this.makeContainer);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addContainer(x, y, width, height) {
        return this.displayList.add(new Container(this.scene, x, y, width, height));
    }

    makeContainer(config) {
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);        
        var width = GetValue(config, 'width', 1);
        var height = GetValue(config, 'height', width);
        var container = new Container(this.scene, 0, 0, width, height);
        BuildGameObject(this.scene, container, config);
        return container;
    }

}

export default ContainerPlugin;