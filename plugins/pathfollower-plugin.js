import PathFollower from './pathfollower.js';

import { Plugins as PhaserPlugins } from 'phaser';
class PathFollowerPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new PathFollower(gameObject, config);
    }

}

export default PathFollowerPlugin;