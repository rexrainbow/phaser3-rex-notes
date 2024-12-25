export default FilterPluginBase;

declare class FilterPluginBase<TController, TConfig> extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TConfig
    ): TController;
    add(
        camera: Phaser.Cameras.Scene2D.Camera,
        config?: TConfig
    ): TController;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;
    remove(
        camera: Phaser.Cameras.Scene2D.Camera,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): TController | TController[];
    get(
        camera: Phaser.Cameras.Scene2D.Camera,
        name?: string
    ): TController | TController[];
}