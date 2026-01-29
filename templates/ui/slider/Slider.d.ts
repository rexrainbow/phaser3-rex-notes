// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import RoundRecrangle from '../../../plugins/roundrectangle';


export default Slider;

declare namespace Slider {

    /**
     * Input handling modes for the slider.
     */
    type InputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';

    /**
     * Configuration options for creating a Slider.
     */
    interface IConfig extends Sizer.IConfig {
        /**
         * Reverse the slider axis direction.
         */
        reverseAxis?: boolean,
        /**
         * Background game object or config.
         */
        background?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        /**
         * Track game object or config.
         */
        track?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        /**
         * Indicator game object or config.
         */
        indicator?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        /**
         * Thumb game object or config.
         */
        thumb?: Phaser.GameObjects.GameObject | RoundRecrangle.IConfig,
        /**
         * Horizontal thumb offset in pixels.
         */
        thumbOffsetX?: number,
        /**
         * Vertical thumb offset in pixels.
         */
        thumbOffsetY?: number,

        /**
         * Input handling mode.
         */
        input?: InputTypes,

        /**
         * Gap between elements.
         */
        gap?: number,
        /**
         * Tick size for value snapping.
         */
        tick?: number,

        /**
         * Initial value.
         */
        value?: number,
        /**
         * Minimum value.
         */
        min?: number,
        /**
         * Maximum value.
         */
        max?: number,

        /**
         * Ease configuration for value changes.
         */
        easeValue?: {
            /**
             * Duration in milliseconds.
             */
            duration?: number,
            /**
             * Easing name.
             */
            ease?: string
        },

        /**
         * Called when the slider value changes.
         *
         * @param newValue - The new value.
         * @param oldValue - The previous value.
         * @param slider - The Slider instance.
         */
        valuechangeCallback: (
            newValue: number,
            oldValue: number,
            slider: Slider
        ) => void,

        /**
         * Enable the slider.
         */
        enable?: boolean,
    }
}

/**
 * A draggable slider control with value management.
 */
declare class Slider extends Sizer {
    /**
     * Create a Slider.
     *
     * @param scene - The Phaser.Scene that owns this Slider.
     * @param config - Configuration options for the Slider.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Slider.IConfig
    );

    /**
     * Current slider value.
     */
    value: number;
    /**
     * Get the current value, optionally remapped to a range.
     *
     * @param min - Minimum of the output range.
     * @param max - Maximum of the output range.
     * @returns The current value.
     */
    getValue(
        min?: number,
        max?: number
    ): number;
    /**
     * Set the current value, optionally clamped to a range.
     *
     * @param value - The value to set.
     * @param min - Minimum allowed value.
     * @param max - Maximum allowed value.
     * @returns This Slider instance.
     */
    setValue(
        value?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Add to the current value, optionally clamped to a range.
     *
     * @param inc - The amount to add.
     * @param min - Minimum allowed value.
     * @param max - Maximum allowed value.
     * @returns This Slider instance.
     */
    addValue(
        inc?: number,
        min?: number,
        max?: number
    ): this;

    /**
     * Ease the value to a target.
     *
     * @param value - The target value.
     * @param min - Minimum allowed value.
     * @param max - Maximum allowed value.
     * @returns This Slider instance.
     */
    easeValueTo(
        value?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Stop any running value easing.
     *
     * @returns This Slider instance.
     */
    stopEaseValue(): this;
    /**
     * Set the duration for value easing.
     *
     * @param duration - Duration in milliseconds.
     * @returns This Slider instance.
     */
    setEaseValueDuration(duration: number): this;
    /**
     * Set the easing function for value easing.
     *
     * @param ease - The easing name.
     * @returns This Slider instance.
     */
    setEaseValueFunction(ease: string): this;

    /**
     * Set the gap between elements.
     *
     * @param gap - The gap size.
     * @param min - Minimum allowed gap.
     * @param max - Maximum allowed gap.
     * @returns This Slider instance.
     */
    setGap(
        gap?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Current gap size.
     */
    gap: number;
    /**
     * Set the tick size.
     *
     * @param tick - The tick size.
     * @param min - Minimum allowed tick.
     * @param max - Maximum allowed tick.
     * @returns This Slider instance.
     */
    setTick(
        tick?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Current tick size.
     */
    tick: number;

    /**
     * Enable or disable the slider.
     *
     * @param enable - Whether the slider is enabled.
     * @returns This Slider instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Whether the slider is enabled.
     */
    enable: boolean;
}
