import BBCodeText from '../bbcodetext/BBCodeText.js';

export default StatesBBCodeText;

declare namespace StatesBBCodeText {
    interface IConfig extends BBCodeText.TextStyle {
        x?: number,
        y?: number,
        text?: string,

        'active.backgroundColor'?: null | string | number,
        'active.backgroundColor2'?: null | string | number,
        'active.backgroundHorizontalGradient'?: boolean,
        'active.backgroundStrokeColor'?: null | string | number,
        'active.backgroundStrokeLineWidth'?: number,
        'active.backgroundCornerRadius'?: number,
        'active.backgroundCornerIteration'?: null | number,
        'active.color'?: null | string | number,
        'active.fill'?: null | string | number,
        'active.stroke'?: null | string | number,
        'active.strokeThickness'?: number,

        'hover.backgroundColor'?: null | string | number,
        'hover.backgroundColor2'?: null | string | number,
        'hover.backgroundHorizontalGradient'?: boolean,
        'hover.backgroundStrokeColor'?: null | string | number,
        'hover.backgroundStrokeLineWidth'?: number,
        'hover.backgroundCornerRadius'?: number,
        'hover.backgroundCornerIteration'?: null | number,
        'hover.color'?: null | string | number,
        'hover.fill'?: null | string | number,
        'hover.stroke'?: null | string | number,
        'hover.strokeThickness'?: number,

        'disable.backgroundColor'?: null | string | number,
        'disable.backgroundColor2'?: null | string | number,
        'disable.backgroundHorizontalGradient'?: boolean,
        'disable.backgroundStrokeColor'?: null | string | number,
        'disable.backgroundStrokeLineWidth'?: number,
        'disable.backgroundCornerRadius'?: number,
        'disable.backgroundCornerIteration'?: null | number,
        'disable.color'?: null | string | number,
        'disable.fill'?: null | string | number,
        'disable.stroke'?: null | string | number,
        'disable.strokeThickness'?: number,
    }
}

declare class StatesBBCodeText extends BBCodeText {
    constructor(
        scene: Phaser.Scene,
        config?: StatesBBCodeText.IConfig
    )

    setActiveState(enable?: boolean): this;
    setHoverState(enable?: boolean): this;
    setDisableState(enable?: boolean): this;
}