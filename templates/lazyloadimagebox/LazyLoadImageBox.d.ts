import ImageBoxBase from '../../plugins/gameobjects/image/imagebox/ImageBoxBase';

export default LazyLoadImageBox;

declare namespace LazyLoadImageBox {
    interface ISPinnerConfig {
        animationMode?: string,
        sizeRatio?: number,
    }

    interface IConfig {
        x?: number, y?: number,
        key?: string, frame?: string, url?: string,

        scaleUp?: boolean,
        width?: number, height?: number,
        background?: ImageBoxBase.IRectangle | Phaser.GameObjects.GameObject,
        image?: Phaser.GameObjects.GameObject,
        spinner?: ISPinnerConfig | Phaser.GameObjects.GameObject,

    }


}

declare class LazyLoadImageBox extends ImageBoxBase {
    constructor(
        scene: Phaser.Scene,
        config?: LazyLoadImageBox.IConfig
    );

    spinner: Phaser.GameObjects.GameObject;

    setTexture(
        key?: string,
        frame?: string,
        url?: string
    ): this;
}