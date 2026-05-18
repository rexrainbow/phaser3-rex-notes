import ObjectFactory from './logic/behaviortree/ObjectFactory';
import Factory from './logic/behaviortree/Factory';

import { Plugins as PhaserPlugins } from 'phaser';
class BehaviorTreePlugin extends PhaserPlugins.BasePlugin {
    add: any;
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);

        this.add = new ObjectFactory();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

export default BehaviorTreePlugin;