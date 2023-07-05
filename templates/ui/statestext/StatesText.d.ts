export default StatesText;

declare namespace StatesText {
    interface IConfig extends Phaser.GameObjects.TextStyle {
        x?: number,
        y?: number,
        text?: string,

        'active.fontFamily'?: string,
        'active.fontSize'?: string,
        'active.fontStyle'?: string,
        'active.backgroundColor'?: null | string | number,
        'active.color'?: null | string | number,
        'active.fill'?: null | string | number,
        'active.stroke'?: null | string | number,
        'active.strokeThickness'?: number,

        'hover.fontFamily'?: string,
        'hover.fontSize'?: string,
        'hover.fontStyle'?: string,
        'hover.backgroundColor'?: null | string | number,
        'hover.color'?: null | string | number,
        'hover.fill'?: null | string | number,
        'hover.stroke'?: null | string | number,
        'hover.strokeThickness'?: number,

        'disable.fontFamily'?: string,
        'disable.fontSize'?: string,
        'disable.fontStyle'?: string,
        'disable.backgroundColor'?: null | string | number,
        'disable.color'?: null | string | number,
        'disable.fill'?: null | string | number,
        'disable.stroke'?: null | string | number,
        'disable.strokeThickness'?: number,
    }
}

declare class StatesText extends Phaser.GameObjects.Text {
    constructor(
        scene: Phaser.Scene,
        config?: StatesText.IConfig
    )

    setActiveState(enable?: boolean): this;
    setHoverState(enable?: boolean): this;
    setDisableState(enable?: boolean): this;
}