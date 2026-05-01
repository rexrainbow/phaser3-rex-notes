import CharacterCache from './charactercache.js';

import { Plugins as PhaserPlugins, Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class CharacterCachePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        if (IsPlainObject(scene)) {
            config = scene;
            scene = this.game;
        }
        return new CharacterCache(scene, config);
    }

    getCache(key) {
        return CharacterCache.getCache(this.game, key);
    }
}

export default CharacterCachePlugin;