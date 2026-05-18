import Factory from './gameobjects/container/containerlite/Factory';
import Creator from './gameobjects/container/containerlite/Creator';
import ContainerLite from './gameobjects/container/containerlite/ContainerLite';
import SetValue from './utils/object/SetValue';

import { Plugins as PhaserPlugins } from 'phaser';
class ContainerLitePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexContainerLite', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    getParent(child?: any) {
        return ContainerLite.GetParent(child);
    }
}

SetValue(window, 'RexPlugins.GameObjects.ContainerLite', ContainerLite);

export default ContainerLitePlugin;