import ObjectFactory from './logic/behaviortree/ObjectFactory.js';
import Factory from './logic/behaviortree/Factory.js';

import { Plugins as PhaserPlugins } from 'phaser';
class BehaviorTreePlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.add = new ObjectFactory();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

export default BehaviorTreePlugin;