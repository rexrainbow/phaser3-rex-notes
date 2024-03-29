export default StatesBitmapText;

declare namespace StatesBitmapText {
    interface IConfig {
        x?: number,
        y?: number,

        font?: string,
        fontSize?: number,
        align?: number,
        tint?: number,
        letterSpacing?: number,
        lineSpacing?: number,

        'active.font'?: string,
        'active.fontSize'?: number,
        'active.tint'?: number,
        'active.letterSpacing'?: number,
        'active.lineSpacing'?: number,

        'hover.font'?: string,
        'hover.fontSize'?: number,
        'hover.tint'?: number,
        'hover.letterSpacing'?: number,
        'hover.lineSpacing'?: number,

        'disable.font'?: string,
        'disable.fontSize'?: number,
        'disable.tint'?: number,
        'disable.letterSpacing'?: number,
        'disable.lineSpacing'?: number,

    }
}

declare class StatesBitmapText extends Phaser.GameObjects.BitmapText {
    constructor(
        scene: Phaser.Scene,
        config?: StatesBitmapText.IConfig
    )

    setActiveState(enable?: boolean): this;
    setHoverState(enable?: boolean): this;
    setDisableState(enable?: boolean): this;
}