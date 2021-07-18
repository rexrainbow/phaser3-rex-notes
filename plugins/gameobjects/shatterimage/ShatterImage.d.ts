export default ShatterImage;

declare namespace ShatterImage {

    interface IConfig {
        x?: number,
        y?: number,
        key: string,
        frame?: string,
        variation?: number,
        samplesPerRing?: number
    }
}

declare class ShatterImage extends Phaser.GameObjects.Mesh {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        key?: string, frame?: string,
        config?: ShatterImage.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: ShatterImage.IConfig
    );

    shatter(centerX?: number, centerY?: number): this;
    readonly shatterCenter: { x: number, y: number };

    startUpdate(): this;
    stopUpdate(): this;

    resetImage(): this;
}