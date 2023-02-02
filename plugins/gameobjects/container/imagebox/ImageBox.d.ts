import ContainerLite from '../containerlite/ContainerLite';

export default ImageBox;

declare namespace ImageBox {

    interface IConfig {
        x?: number, y?: number,
        texture?: string, frame?: string,

        width?: number, height?: number,
    }
}

declare class ImageBox extends ContainerLite {
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

    constructor(
        scene: Phaser.Scene,
        config?: ImageBox.IConfig
    );

    setTexture(texture?: string, frame?: string): this;
    texture: Phaser.Textures.Texture;
    frame: Phaser.Textures.Frame;

    setFlipX(value: boolean): this;
    setFlipY(value: boolean): this;
    toggleFlipX(): this;
    toggleFlipY(): this;
    setFlip(x: boolean, y: boolean): this;
    flipX: boolean;
    flipY: boolean;
}