import CharacterCache from './charactercache';

import { Plugins as PhaserPlugins, Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class CharacterCachePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene?: any, config?: any) {
        if (IsPlainObject(scene)) {
            config = scene;
            scene = this.game;
        }
        return new CharacterCache(scene, config);
    }

    getCache(key?: any) {
        return CharacterCache.getCache(this.game, key);
    }
}

export default CharacterCachePlugin;