import Sizer from '../../sizer/Sizer';
import RoundRecrangle from '../../../../plugins/roundrectangle';


export default Scrollable;

declare namespace Scrollable {

    /**
     * Scroll mode values.
     */
    type ScrollModeTypes = 0 | 1 | 2 | 'v' | 'h' | 'vh' | 'vertical' | 'horizontal' | 'x' | 'y' | 'xy';
    /**
     * Alignment values.
     */
    type AlignTypes = 'left' | 'top' | 'right' | 'bottom' | 'center';
    /**
     * Input modes for sliders.
     */
    type SliderInputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';
    /**
     * Slider position options.
     */
    type SliderPositionTypes = 0 | 1 | 'right' | 'bottom' | 'left' | 'top';

    interface ISliderConfig {
        /**
         * Background game object or config.
         */
        background?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        /**
         * Track game object or config.
         */
        track?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        /**
         * Thumb game object or config.
         */
        thumb?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        /**
         * Slider input mode.
         */
        input?: SliderInputTypes,
        /**
         * Slider position.
         */
        position?: SliderPositionTypes,
        /**
         * Tick size for discrete steps.
         */
        tick?: number,

        /**
         * True to hide slider when unscrollable.
         */
        hideUnscrollableSlider?: boolean,
        /**
         * True to disable dragging when unscrollable.
         */
        disableUnscrollableDrag?: boolean,
        /**
         * True to adapt thumb size to content.
         */
        adaptThumbSize?: boolean,
        /**
         * Minimum thumb size.
         */
        minThumbSize?: number,

        /**
         * Optional scroll buttons.
         */
        buttons?: {
            /**
             * Top button.
             */
            top?: Phaser.GameObjects.GameObject,
            /**
             * Bottom button.
             */
            bottom?: Phaser.GameObjects.GameObject,
            /**
             * Left button.
             */
            left?: Phaser.GameObjects.GameObject,
            /**
             * Right button.
             */
            right?: Phaser.GameObjects.GameObject,
            /**
             * Scroll step size.
             */
            step?: number
        }
    }

    interface IScrollerConfig {
        /**
         * Drag threshold.
         */
        threshold?: number,
        /**
         * Sliding deceleration, or false to disable.
         */
        slidingDeceleration?: number | false,
        /**
         * Back deceleration, or false to disable.
         */
        backDeceleration?: number | false,
        /**
         * Drag rate.
         */
        dragRate?: number,
        /**
         * True to release on pointer out.
         */
        pointerOutRelease?: boolean,
        /**
         * True to use rect bounds for interaction.
         */
        rectBoundsInteractive?: boolean,
    }

    interface IMouseWheelScroller {
        /**
         * Focus mode for mouse wheel.
         */
        focus?: boolean | 0 | 1 | 2,
        /**
         * Scroll speed.
         */
        speed?: number,
    }

    interface IConfig extends Sizer.IConfig {
        /**
         * Spacing configuration.
         */
        space?: {
            /**
             * Left space.
             */
            left?: number,
            /**
             * Right space.
             */
            right?: number,
            /**
             * Top space.
             */
            top?: number,
            /**
             * Bottom space.
             */
            bottom?: number,

            /**
             * Horizontal slider spacing.
             */
            sliderX?: number,
            /**
             * Vertical slider spacing.
             */
            sliderY?: number,
            /**
             * Header spacing.
             */
            header?: number,
            /**
             * Footer spacing.
             */
            footer?: number,
        },

        /**
         * Scroll mode.
         */
        scrollMode?: ScrollModeTypes,

        /**
         * Background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Snap step for both axes.
         */
        snapStep?: number,
        /**
         * Snap step for x axis.
         */
        snapStepX?: number,
        /**
         * Snap step for y axis.
         */
        snapStepY?: number,

        /**
         * Slider configuration.
         */
        slider?: ISliderConfig | boolean,
        /**
         * Slider configuration for x axis.
         */
        sliderX?: ISliderConfig | boolean,
        /**
         * Slider configuration for y axis.
         */
        sliderY?: ISliderConfig | boolean,

        /**
         * Scroll detection mode.
         */
        scrollDetectionMode?: 0 | 1 | 'rectBounds' | 'gameObject',

        /**
         * Scroller configuration.
         */
        scroller?: IScrollerConfig | boolean,
        /**
         * Scroller configuration for x axis.
         */
        scrollerX?: IScrollerConfig | boolean,
        /**
         * Scroller configuration for y axis.
         */
        scrollerY?: IScrollerConfig | boolean,

        /**
         * Mouse wheel scroller configuration.
         */
        mouseWheelScroller?: IMouseWheelScroller | boolean,
        /**
         * Mouse wheel scroller for x axis.
         */
        mouseWheelScrollerX?: IMouseWheelScroller | boolean,
        /**
         * Mouse wheel scroller for y axis.
         */
        mouseWheelScrollerY?: IMouseWheelScroller | boolean,

        /**
         * Clamp child OY within bounds.
         */
        clampChildOY?: boolean,
        /**
         * Clamp child OX within bounds.
         */
        clampChildOX?: boolean,

        /**
         * Header game object.
         */
        header?: Phaser.GameObjects.GameObject,
        /**
         * Footer game object.
         */
        footer?: Phaser.GameObjects.GameObject,

        /**
         * Alignment for header and footer.
         */
        align?: {
            /**
             * Header alignment.
             */
            header?: AlignTypes,
            /**
             * Footer alignment.
             */
            footer?: AlignTypes,
        },

        /**
         * Expand settings.
         */
        expand?: {
            /**
             * True to expand header.
             */
            header?: boolean,
            /**
             * True to expand footer.
             */
            footer?: boolean,
        },
    }

}

/**
 * Scrollable sizer with optional sliders, scrollers, and mouse wheel support.
 */
declare class Scrollable extends Sizer {
    /**
     * Normalized scroll position for vertical axis.
     */
    t: number;
    /**
     * Normalized scroll position for horizontal axis.
     */
    s: number;

    /**
     * Set vertical scroll position.
     * @param value - Normalized value.
     * @param clamp - True to clamp within bounds.
     * @returns This instance.
     */
    setT(value: number, clamp?: boolean): this;
    /**
     * Add to vertical scroll position.
     * @param inc - Delta value.
     * @param clamp - True to clamp within bounds.
     * @returns This instance.
     */
    addT(inc: number, clamp?: boolean): this;
    /**
     * Scroll to the top.
     * @returns This instance.
     */
    scrollToTop(): this;
    /**
     * Scroll to the bottom.
     * @returns This instance.
     */
    scrollToBottom(): this;

    /**
     * Set horizontal scroll position.
     * @param value - Normalized value.
     * @param clamp - True to clamp within bounds.
     * @returns This instance.
     */
    setS(value: number, clamp?: boolean): this;
    /**
     * Add to horizontal scroll position.
     * @param inc - Delta value.
     * @param clamp - True to clamp within bounds.
     * @returns This instance.
     */
    addS(inc: number, clamp?: boolean): this;
    /**
     * Scroll to the left.
     * @returns This instance.
     */
    scrollToLeft(): this;
    /**
     * Scroll to the right.
     * @returns This instance.
     */
    scrollToRight(): this;

    /**
     * Current child offset Y.
     */
    childOY: number;
    /**
     * Current child offset X.
     */
    childOX: number;

    /**
     * Top offset limit for child OY.
     */
    readonly topChildOY: number;
    /**
     * Bottom offset limit for child OY.
     */
    readonly bottomChildOY: number;
    /**
     * Left offset limit for child OX.
     */
    readonly leftChildOX: number;
    /**
     * Right offset limit for child OX.
     */
    readonly rightChildOX: number;

    /**
     * Visible child height.
     */
    readonly childVisibleHeight: number;
    /**
     * Total child height.
     */
    readonly childHeight: number;
    /**
     * Visible child width.
     */
    readonly childVisibleWidth: number;
    /**
     * Total child width.
     */
    readonly childWidth: number;

    /**
     * Set child OY.
     * @param value - Offset value.
     * @param clamp - True to clamp within bounds.
     * @returns This instance.
     */
    setChildOY(value: number, clamp?: boolean): this;
    /**
     * Add to child OY.
     * @param inc - Delta value.
     * @param clamp - True to clamp within bounds.
     * @returns This instance.
     */
    addChildOY(inc: number, clamp?: boolean): this;
    /**
     * Set child OX.
     * @param value - Offset value.
     * @param clamp - True to clamp within bounds.
     * @returns This instance.
     */
    setChildOX(value: number, clamp?: boolean): this;
    /**
     * Add to child OX.
     * @param inc - Delta value.
     * @param clamp - True to clamp within bounds.
     * @returns This instance.
     */
    addChildOX(inc: number, clamp?: boolean): this;

    /**
     * True if any slider is enabled.
     */
    sliderEnable: boolean;
    /**
     * Enable or disable all sliders.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setSliderEnable(enable?: boolean): this;
    /**
     * True if vertical slider is enabled.
     */
    sliderYEnable: boolean;
    /**
     * Enable or disable vertical slider.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setSliderYEnable(enable?: boolean): this;
    /**
     * True if horizontal slider is enabled.
     */
    sliderXEnable: boolean;
    /**
     * Enable or disable horizontal slider.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setSliderXEnable(enable?: boolean): this;

    /**
     * True if any scroller is enabled.
     */
    scrollerEnable: boolean;
    /**
     * Enable or disable all scrollers.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setScrollerEnable(enable?: boolean): this;
    /**
     * True if vertical scroller is enabled.
     */
    scrollerYEnable: boolean;
    /**
     * Enable or disable vertical scroller.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setScrollerYEnable(enable?: boolean): this;
    /**
     * True if horizontal scroller is enabled.
     */
    scrollerXEnable: boolean;
    /**
     * Enable or disable horizontal scroller.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setScrollerXEnable(enable?: boolean): this;

    /**
     * True if any mouse wheel scroller is enabled.
     */
    mouseWheelScrollerEnable: boolean;
    /**
     * Enable or disable all mouse wheel scrollers.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setMouseWheelScrollerEnable(enable?: boolean): this;
    /**
     * True if vertical mouse wheel scroller is enabled.
     */
    mouseWheelScrollerYEnable: boolean;
    /**
     * Enable or disable vertical mouse wheel scroller.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setMouseWheelScrollerYEnable(enable?: boolean): this;
    /**
     * True if horizontal mouse wheel scroller is enabled.
     */
    mouseWheelScrollerXEnable: boolean;
    /**
     * Enable or disable horizontal mouse wheel scroller.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setMouseWheelScrollerXEnable(enable?: boolean): this;

    /**
     * Current scroll mode.
     */
    readonly scrollMode: number;

    /**
     * True if content overflows in any direction.
     */
    readonly isOverflow: boolean;
    /**
     * True if content overflows vertically.
     */
    readonly isOverflowY: boolean;
    /**
     * True if content overflows horizontally.
     */
    readonly isOverflowX: boolean;
}
