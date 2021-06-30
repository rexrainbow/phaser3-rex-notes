import Sizer from '../../sizer/Sizer';
import { IConfig as IConfigBase } from '../../sizer/Sizer';

export interface IConfig extends IConfigBase {
    space?: {
        left?: number, right?: number, top?: number, bottom?: number,

        header?: number,
        footer?: number,
    },

    scrollMode?: 0 | 1 | 'v' | 'h' | 'vertical' | 'horizontal',

    background?: Phaser.GameObjects.GameObject,

    slider?: {
        background?: Phaser.GameObjects.GameObject,
        track?: Phaser.GameObjects.GameObject,
        thumb?: Phaser.GameObjects.GameObject,
        input?: 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none',
        position?: 0 | 1 | 'right' | 'bottom' | 'left' | 'top',
    },

    scroller?: {
        threshold?: number,
        slidingDeceleration?: number,
        backDeceleration?: number,
    },

    clamplChildOY?: boolean,

    header?: Phaser.GameObjects.GameObject,
    footer?: Phaser.GameObjects.GameObject,

    align?: {
        header?: 'left' | 'top' | 'right' | 'bottom' | 'center',
        footer?: 'left' | 'top' | 'right' | 'bottom' | 'center',
    },

    expand?: {
        header?: boolean,
        footer?: boolean,
    },
}

export default class Scrollable extends Sizer {
    t: number;
    setT(value: number): this;
    scrollToTop(): this;
    scrollToBottom(): this;

    childOY: number;
    get topChildOY(): number;
    get bottomChildOY(): number;
    setChildOY(value: number): this;

    sliderEnable: boolean;
    setSliderEnable(enable?: boolean): this;

    scrollerEnable: boolean;
    setScrollerEnable(enable?: boolean): this;
}