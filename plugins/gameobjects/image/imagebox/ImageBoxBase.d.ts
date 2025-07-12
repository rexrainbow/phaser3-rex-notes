import ContainerLite from '../../container/containerlite/ContainerLite';

export default ImageBoxBase;

declare namespace ImageBoxBase {
    interface IRectangle {
        color?: number, alpha?: number,
        strokeWidth?: number, strokeColor?: number, strokeAlpha?: number,
    }
}

declare class ImageBoxBase extends ContainerLite {

    background: Phaser.GameObjects.GameObject;
    image: Phaser.GameObjects.GameObject;

    setTexture(key?: string, frame?: string): this;
    readonly texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    readonly frame: Phaser.Textures.Frame;

    setFlipX(value: boolean): this;
    setFlipY(value: boolean): this;
    toggleFlipX(): this;
    toggleFlipY(): this;
    setFlip(x: boolean, y: boolean): this;
    flipX: boolean;
    flipY: boolean;

    setTint(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this;
}