import ImageBoxBase from './ImageBoxBase';

export default ImageBox;

declare namespace ImageBox {

    interface IConfig {
        x?: number, y?: number,
        key?: string, frame?: string,

        scaleUp?: boolean,
        width?: number, height?: number,

        background?: ImageBoxBase.IRectangle | Phaser.GameObjects.GameObject,
        image?: Phaser.GameObjects.GameObject,

    }
}

declare class ImageBox extends ImageBoxBase {
    constructor(
        scene: Phaser.Scene,
        config?: ImageBox.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        texture?: string, frame?: string,
        config?: ImageBox.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        config?: ImageBox.IConfig
    );
}