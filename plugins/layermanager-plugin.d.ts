import LayerManager from './layermanager';

export default class LayerManagerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        config?: LayerManager.IConfig
    ): LayerManager;

}