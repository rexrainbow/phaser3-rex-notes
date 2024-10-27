import Sizer from '../../sizer/Sizer';
import RoundRecrangle from '../../../../plugins/roundrectangle';


export default Scrollable;

declare namespace Scrollable {

    type ScrollModeTypes = 0 | 1 | 2 | 'v' | 'h' | 'vh' | 'vertical' | 'horizontal' | 'x' | 'y' | 'xy';
    type AlignTypes = 'left' | 'top' | 'right' | 'bottom' | 'center';
    type SliderInputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';
    type SliderPositionTypes = 0 | 1 | 'right' | 'bottom' | 'left' | 'top';

    interface ISliderConfig {
        background?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        track?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        thumb?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        input?: SliderInputTypes,
        position?: SliderPositionTypes,
        tick?: number,
        tickLength?: number,

        hideUnscrollableSlider?: boolean,
        disableUnscrollableDrag?: boolean,
        adaptThumbSize?: boolean,
        minThumbSize?: number,

        buttons?: {
            top?: Phaser.GameObjects.GameObject,
            bottom?: Phaser.GameObjects.GameObject,
            left?: Phaser.GameObjects.GameObject,
            right?: Phaser.GameObjects.GameObject,
            step?: number
        }
    }

    interface IScrollerConfig {
        threshold?: number,
        slidingDeceleration?: number | false,
        backDeceleration?: number | false,
        dragRate?: number,
        pointerOutRelease?: boolean,
        rectBoundsInteractive?: boolean,
    }

    interface IMouseWheelScroller {
        focus?: boolean | 0 | 1 | 2,
        speed?: number,
    }

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            sliderX?: number,
            sliderY?: number,
            header?: number,
            footer?: number,
        },

        scrollMode?: ScrollModeTypes,

        background?: Phaser.GameObjects.GameObject,

        slider?: ISliderConfig | boolean,
        sliderX?: ISliderConfig | boolean,
        sliderY?: ISliderConfig | boolean,


        scrollDetectionMode?: 0 | 1 | 'rectBounds' | 'gameObject',

        scroller?: IScrollerConfig | boolean,
        scrollerX?: IScrollerConfig | boolean,
        scrollerY?: IScrollerConfig | boolean,

        mouseWheelScroller?: IMouseWheelScroller | boolean,
        mouseWheelScrollerX?: IMouseWheelScroller | boolean,
        mouseWheelScrollerY?: IMouseWheelScroller | boolean,

        clampChildOY?: boolean,
        clampChildOX?: boolean,

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
    s: number;

    setT(value: number, clamp?: boolean): this;
    addT(inc: number, clamp?: boolean): this;
    scrollToTop(): this;
    scrollToBottom(): this;

    setS(value: number, clamp?: boolean): this;
    addS(inc: number, clamp?: boolean): this;
    scrollToLeft(): this;
    scrollToRight(): this;

    childOY: number;
    childOX: number;

    readonly topChildOY: number;
    readonly bottomChildOY: number;
    readonly leftChildOX: number;
    readonly rightChildOX: number;

    readonly childVisibleHeight: number;
    readonly childHeight: number;
    readonly childVisibleWidth: number;
    readonly childWidth: number;

    setChildOY(value: number, clamp?: boolean): this;
    addChildOY(inc: number, clamp?: boolean): this;
    setChildOX(value: number, clamp?: boolean): this;
    addChildOX(inc: number, clamp?: boolean): this;

    sliderEnable: boolean;
    setSliderEnable(enable?: boolean): this;
    sliderYEnable: boolean;
    setSliderYEnable(enable?: boolean): this;
    sliderXEnable: boolean;
    setSliderXEnable(enable?: boolean): this;

    scrollerEnable: boolean;
    setScrollerEnable(enable?: boolean): this;
    scrollerYEnable: boolean;
    setScrollerYEnable(enable?: boolean): this;
    scrollerXEnable: boolean;
    setScrollerXEnable(enable?: boolean): this;

    mouseWheelScrollerEnable: boolean;
    setMouseWheelScrollerEnable(enable?: boolean): this;
    mouseWheelScrollerYEnable: boolean;
    setMouseWheelScrollerYEnable(enable?: boolean): this;
    mouseWheelScrollerXEnable: boolean;
    setMouseWheelScrollerXEnable(enable?: boolean): this;

    readonly scrollMode: number;

    readonly isOverflow: boolean;
    readonly isOverflowY: boolean;
    readonly isOverflowX: boolean;
}
