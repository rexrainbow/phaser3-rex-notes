export default ScaleOuter;

declare class ScaleOuter {
    constructor(
        scene: Phaser.Scene
    );

    destroy(): void;

    add(
        camera: Phaser.Cameras.Scene2D.BaseCamera
    ): this;

    readonly scrollX: number;
    readonly scrollY: number;
    readonly zoom: number;
}