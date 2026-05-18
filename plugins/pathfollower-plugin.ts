import PathFollower from './pathfollower';

import { Plugins as PhaserPlugins } from 'phaser';
class PathFollowerPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, config?: any) {
        return new PathFollower(gameObject, config);
    }

}

export default PathFollowerPlugin;