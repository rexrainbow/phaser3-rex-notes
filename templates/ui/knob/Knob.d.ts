// import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';


export default Knob;

declare namespace Knob {

    /**
     * Input modes supported by the knob control.
     */
    type InputTypes = 0 | 1 | -1 | 'drag' | 'pan' | 'click' | 'none';

    /**
     * Callback used to format knob value text.
     */
    type TextFormatCallbackType = (
        /**
         * Current knob value.
         */
        value: number
    ) => string;

    /**
     * Callback invoked when knob value changes.
     */
    type ValueChangeCallbackType = (
        /**
         * New knob value.
         */
        newValue: number,
        /**
         * Previous knob value.
         */
        oldValue: number,
        /**
         * Knob instance.
         */
        knob: Knob
    ) => void;

    /**
     * Configuration options for creating a knob component.
     */
    interface IConfig extends OverlapSizer.IConfig {
        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Bar color.
         */
        barColor?: number | string,
        /**
         * Track color.
         */
        trackColor?: number | string,
        /**
         * Center color.
         */
        centerColor?: number | string,
        /**
         * Thickness of bar/track.
         */
        thickness?: number,
        /**
         * Start angle in radians.
         */
        startAngle?: number,
        /**
         * Set to true to draw anticlockwise.
         */
        anticlockwise?: boolean,
        /**
         * Display depth of internal knob graphics.
         */
        knobDepth?: number,

        /**
         * Optional text game object.
         */
        text?: Phaser.GameObjects.GameObject,
        /**
         * Callback used to format displayed value text.
         */
        textFormatCallback?: TextFormatCallbackType,
        /**
         * Scope used when invoking text format callback.
         */
        textFormatCallbackScope?: object,

        /**
         * Input mode.
         */
        input?: InputTypes,

        /**
         * Initial value.
         */
        value?: number,

        /**
         * Gap between track and center.
         */
        gap?: number,

        easeValue?: {
            /**
             * Ease duration in milliseconds.
             */
            duration?: number,
            /**
             * Ease function name.
             */
            ease?: string
        },

        /**
         * Callback fired when value changes.
         */
        valuechangeCallback: ValueChangeCallbackType,

        /**
         * Set to true to enable input interaction.
         */
        enable?: boolean,

    }

}

/**
 * Circular knob UI component with drag/click value input.
 */
declare class Knob extends OverlapSizer {
    /**
     * Create a knob component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional knob configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Knob.IConfig
    );

    /**
     * Current knob value.
     */
    value: number;
    /**
     * Get value, optionally mapped to a custom range.
     *
     * @param min - Optional minimum of output range.
     * @param max - Optional maximum of output range.
     * @returns Current value.
     */
    getValue(
        min?: number,
        max?: number
    ): number;
    /**
     * Set value, optionally by mapping from a custom range.
     *
     * @param value - Value to set.
     * @param min - Optional minimum of input range.
     * @param max - Optional maximum of input range.
     * @returns This component instance.
     */
    setValue(
        value?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Add delta to current value.
     *
     * @param inc - Increment value.
     * @param min - Optional minimum of input range.
     * @param max - Optional maximum of input range.
     * @returns This component instance.
     */
    addValue(
        inc?: number,
        min?: number,
        max?: number
    ): this;

    /**
     * Ease value to target.
     *
     * @param value - Target value.
     * @param min - Optional minimum of input range.
     * @param max - Optional maximum of input range.
     * @returns This component instance.
     */
    easeValueTo(
        value?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Stop current value easing.
     *
     * @returns This component instance.
     */
    stopEaseValue(): this;
    /**
     * Set ease duration.
     *
     * @param duration - Duration in milliseconds.
     * @returns This component instance.
     */
    setEaseValueDuration(duration: number): this;
    /**
     * Set ease function.
     *
     * @param ease - Ease function name.
     * @returns This component instance.
     */
    setEaseValueFunction(ease: string): this;

    /**
     * Enable or disable knob interaction.
     *
     * @param enable - True to enable interaction.
     * @returns This component instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Current enabled state.
     */
    enable: boolean;
}
