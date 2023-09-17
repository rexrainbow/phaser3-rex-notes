export default GridCutImage;

declare namespace GridCutImage {
    interface IConfig<T = Phaser.GameObjects.Image> {
        columns?: number,
        rows?: number,

        createImageCallback?: (
            scene: Phaser.Scene,
            key: Phaser.Textures.Texture,
            frame: string
        ) => T,
        ImageClass?: T,
        objectPool?: T[],

        originX?: number,
        originY?: number,

        add?: boolean,
        align?: boolean,
    }
}

declare function GridCutImage<T = Phaser.GameObjects.Image>(
    gameObject: Phaser.GameObjects.GameObject,
    columns: number,
    rows: number,
    config?: GridCutImage.IConfig
): T[];

declare function GridCutImage<T = Phaser.GameObjects.Image>(
    gameObject: Phaser.GameObjects.GameObject,
    config?: GridCutImage.IConfig
): T[];
