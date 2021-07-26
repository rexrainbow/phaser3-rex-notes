import Sizer from '../../sizer/Sizer';


export default Scrollable;

declare namespace Scrollable {

    type scrollModeTypes = 0 | 1 | 'v' | 'h' | 'vertical' | 'horizontal';
    type AlignTypes = 'left' | 'top' | 'right' | 'bottom' | 'center';
    type SliderInputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';
    type SliderPositionTypes = 0 | 1 | 'right' | 'bottom' | 'left' | 'top'

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            header?: number,
            footer?: number,
        },

        scrollMode?: scrollModeTypes,

        background?: Phaser.GameObjects.GameObject,

        slider?: (
            {
                background?: Phaser.GameObjects.GameObject,
                track?: Phaser.GameObjects.GameObject,
                thumb?: Phaser.GameObjects.GameObject,
                input?: SliderInputTypes,
                position?: SliderPositionTypes,
            } |
            boolean
        ),

        scroller?: (
            {
                threshold?: number,
                slidingDeceleration?: number | false,
                backDeceleration?: number | false,
            } |
            boolean
        ),

        mouseWheelScroller?: (
            {
                focus?: boolean,
                speed?: number,
            } |
            boolean
        ),

        clamplChildOY?: boolean,

        header?: Phaser.GameObjects.GameObject,
        footer?: Phaser.GameObjects.GameObject,

        align?: {
            header?: AlignTypes,
            footer?: AlignTypes,
        },

        expand?: {
            header?: boolean,
            footer?: boolean,
        },
    }

}

declare class Scrollable extends Sizer {
    t: number;
    setT(value: number, clamp?: boolean): this;
    addT(inc: number, clamp?: boolean): this;
    scrollToTop(): this;
    scrollToBottom(): this;

    childOY: number;
    readonly topChildOY: number;
    readonly bottomChildOY: number;
    setChildOY(value: number, clamp?: boolean): this;
    addChildOY(inc: number, clamp?: boolean): this;

    sliderEnable: boolean;
    setSliderEnable(enable?: boolean): this;

    scrollerEnable: boolean;
    setScrollerEnable(enable?: boolean): this;

    mouseWheelScrollerEnable: boolean;
    setMouseWheelScrollerEnable(enable?: boolean): this;

}