export default StatesImage;

declare namespace StatesImage {
    interface IConfig {
        x?: number,
        y?: number,

        key?: string,
        frame?: string,

        'active.key'?: string,
        'active.frame'?: string,

        'hover.key'?: string,
        'hover.frame'?: string,

        'disable.key'?: string,
        'disable.frame'?: string,

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