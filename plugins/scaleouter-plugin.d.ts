export default class ScalePlugin extends Phaser.Plugins.ScenePlugin {
    add(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
    ): this;

    readonly scrollX: number;
    readonly scrollY: number;
    readonly zoom: number;
}