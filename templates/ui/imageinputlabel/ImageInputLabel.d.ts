import Label from '../label/Label';

export default ImageInputLabel;

declare namespace ImageInputLabel {
    interface IConfig extends Label.IConfig {
        iconBackground?: Phaser.GameObjects.GameObject,

        canvas?: {
            width?: number, height?: number, fill?: string,
            key?: string, frame?: string,
        },

        scaleUpIcon?: boolean,

        clickTarget?: string | Phaser.GameObjects.GameObject | null,

        domButton?: boolean,
    }

}

declare class ImageInputLabel extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: ImageInputLabel.IConfig
    );

    open(): this;

    openPromise(): Promise<File>;

    saveTexture(key: string): this;

    getFileName(file: File): string;

    setClickOpenEnable(enable?: boolean): this;

}