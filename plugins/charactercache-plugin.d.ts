import CharacterCache from './charactercache';

export default class CharacterCachePlugin extends Phaser.Plugins.BasePlugin {
    add(
        config: CharacterCache.IConfig
    ): CharacterCache;

    add(
        scene: Phaser.Scene | Phaser.Game,
        config: CharacterCache.IConfig
    ): CharacterCache;

    getCache(key: string): CharacterCache;
}