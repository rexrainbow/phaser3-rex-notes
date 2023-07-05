export default StatesImage;

declare namespace StatesImage {
    interface IConfig {
        x?: number,
        y?: number,

        key?: string,
        frame?: string,
        scale?: number,

        'active.key'?: string,
        'active.frame'?: string,
        'active.scale'?: number,

        'hover.key'?: string,
        'hover.frame'?: string,
        'hover.scale'?: number,

        'disable.key'?: string,
        'disable.frame'?: string,
        'disable.scale'?: number,

    }
}

declare class StatesImage extends Phaser.GameObjects.Image {
    constructor(
        scene: Phaser.Scene,
        config?: StatesImage.IConfig
    )

    setActiveState(enable?: boolean): this;
    setHoverState(enable?: boolean): this;
    setDisableState(enable?: boolean): this;
}