export default StatesNineSlice;

declare namespace StatesNineSlice {
    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        key?: string,
        frame?: string,
        leftWidth?: number,
        rightWidth?: number,
        topHeight?: number,
        bottomHeight?: number,

        'active.key'?: string,
        'active.frame'?: string,
        'active.leftWidth'?: number,
        'active.rightWidth'?: number,
        'active.topHeight'?: number,
        'active.bottomHeight'?: number,

        'hover.key'?: string,
        'hover.frame'?: string,
        'hover.leftWidth'?: number,
        'hover.rightWidth'?: number,
        'hover.topHeight'?: number,
        'hover.bottomHeight'?: number,

        'disable.key'?: string,
        'disable.frame'?: string,
        'disable.leftWidth'?: number,
        'disable.rightWidth'?: number,
        'disable.topHeight'?: number,
        'disable.bottomHeight'?: number,

    }
}

declare class StatesNineSlice extends Phaser.GameObjects.NineSlice {
    constructor(
        scene: Phaser.Scene,
        config?: StatesNineSlice.IConfig
    )

    setActiveState(enable?: boolean): this;
    setHoverState(enable?: boolean): this;
    setDisableState(enable?: boolean): this;
}