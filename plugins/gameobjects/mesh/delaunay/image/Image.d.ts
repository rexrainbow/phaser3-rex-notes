export default DelaunayImage;

declare namespace DelaunayImage {
    type GetRingRadiusListCallback = (width: number, height: number) => number[];

    interface IConfig {
        x?: number,
        y?: number,
        key: string,
        frame?: string,

        triangleCount?: number,
    }

    interface DelaunayIConfig {
        triangleCount?: number,
    }
}

declare class DelaunayImage extends Phaser.GameObjects.Mesh {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        key?: string, frame?: string,
        config?: DelaunayImage.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: DelaunayImage.IConfig
    );

    reTriangulate(
        config?: DelaunayImage.DelaunayIConfig
    ): this;

    triangleCount: number;
    setTriangleCount(triangleCount: number): this;

    resetImage(): this;
}