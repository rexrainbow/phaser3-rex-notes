import NinePatch from '../ninepatch/NinePatch';
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

        'hover.key'?: string,
        'hover.frame'?: string,

        'disable.key'?: string,
        'disable.frame'?: string,
    }
}

declare class StatesNineSlice extends NinePatch {
    constructor(
        scene: Phaser.Scene,
        config?: StatesNineSlice.IConfig
    )

    setActiveState(enable?: boolean): this;
    setHoverState(enable?: boolean): this;
    setDisableState(enable?: boolean): this;
}