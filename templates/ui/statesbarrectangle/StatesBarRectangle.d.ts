import LineProgress from '../lineprogress/LineProgress';

export default StatesBarRectangle;

declare namespace StatesBarRectangle {
    interface IConfig extends LineProgress.IConfig {
        easeDuration?: number,
        ease?: string,

        'active.barColor'?: number,
        'active.color'?: number,
        'active.alpha'?: number,
        'active.strokeColor'?: number,
        'active.strokeAlpha'?: number,
        'active.strokeWidth'?: number,

        'hover.barColor'?: number,
        'hover.color'?: number,
        'hover.alpha'?: number,
        'hover.strokeColor'?: number,
        'hover.strokeAlpha'?: number,
        'hover.strokeWidth'?: number,
        'hover.bar'?: boolean,

        'disable.barColor'?: number,
        'disable.color'?: number,
        'disable.alpha'?: number,
        'disable.strokeColor'?: number,
        'disable.strokeAlpha'?: number,
        'disable.strokeWidth'?: number,

    }
}

declare class StatesBarRectangle extends LineProgress {
    constructor(
        scene: Phaser.Scene,
        config?: StatesBarRectangle.IConfig
    )

    setActiveState(enable?: boolean): this;
    setHoverState(enable?: boolean): this;
    setDisableState(enable?: boolean): this;
}