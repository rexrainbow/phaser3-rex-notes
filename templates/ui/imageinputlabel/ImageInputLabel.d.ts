import Label from '../label/Label';
import Open from '../../../plugins/behaviors/filechooser/Open';

export default ImageInputLabel;

declare namespace ImageInputLabel {
    interface IConfig extends Label.IConfig {
        domButton?: boolean,

        iconBackground?: Phaser.GameObjects.GameObject,

        scaleUpIcon?: boolean,

        canvas?: {
            width?: number, height?: number,
            key?: number, frame?: number,
            fill?: string,
        },

        clickTarget?: string | Phaser.GameObjects.GameObject | null,

    }

}

declare class ImageInputLabel extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: ImageInputLabel.IConfig
    );

    open(): this;

    openPromise(): Promise<void>;

    saveTexture(key: string): this;

    getFileName(file: File): string;

    setClickOpenEnable(enable?: boolean): this;

}