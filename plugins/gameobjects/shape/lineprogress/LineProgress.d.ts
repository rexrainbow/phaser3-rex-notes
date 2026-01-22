import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default LineProgress;

declare namespace LineProgress {

    /**
     * Callback fired when value changes.
     * @param newValue - New value.
     * @param oldValue - Previous value.
     * @param circularProgress - Progress instance.
     */
    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        circularProgress: LineProgress
    ) => void;

    interface IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Width of the progress bar.
         */
        width?: number,
        /**
         * Height of the progress bar.
         */
        height?: number,

        /**
         * Track color.
         */
        trackColor?: string | number,
        /**
         * Track stroke thickness.
         */
        trackStrokeThickness?: number,
        /**
         * Track stroke color.
         */
        trackStrokeColor?: string | number,
        /**
         * Bar color.
         */
        barColor?: string | number,

        /**
         * Skew x angle in radians.
         */
        skewX?: number,

        /**
         * Right-to-left flag.
         */
        rtl?: boolean,

        /**
         * Initial value.
         */
        value?: number,

        /**
         * Ease configuration.
         */
        easeValue?: {
            /**
             * Ease duration.
             */
            duration?: number,
            /**
             * Ease function name.
             */
            ease?: string
        },

        /**
         * Value change callback.
         */
        valuechangeCallback: ValueChangeCallbackType,
    }

    namespace Events {
        /**
         * Fired when value changes.
         * @param newValue - New value.
         * @param oldValue - Previous value.
         * @param circularProgress - Progress instance.
         */
        type ValueChangeCallbackType = (
            newValue: number,
            oldValue: number,
            circularProgress: LineProgress
        ) => void;
    }
}

/**
 * Line progress shape with track and bar styling.
 */
declare class LineProgress extends BaseShapes {
    /**
     * Create a line progress.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: LineProgress.IConfig
    );

    /**
     * Create a line progress.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - Width of the progress bar.
     * @param height - Height of the progress bar.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        config?: LineProgress.IConfig
    );

    /**
     * Create a line progress.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - Width of the progress bar.
     * @param height - Height of the progress bar.
     * @param barColor - Bar color.
     * @param value - Initial value.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        barColor?: string | number,
        value?: number,
        config?: LineProgress.IConfig
    );

    /**
     * Current value.
     */
    value: number;
    /**
     * Get value in a range.
     * @param min - Min value.
     * @param max - Max value.
     * @returns Value.
     */
    getValue(min?: number, max?: number): number;
    /**
     * Set value in a range.
     * @param value - Target value.
     * @param min - Min value.
     * @param max - Max value.
     * @returns This instance.
     */
    setValue(value?: number, min?: number, max?: number): this;
    /**
     * Add value in a range.
     * @param inc - Increment value.
     * @param min - Min value.
     * @param max - Max value.
     * @returns This instance.
     */
    addValue(inc?: number, min?: number, max?: number): this;

    /**
     * Ease value to a target.
     * @param value - Target value.
     * @param min - Min value.
     * @param max - Max value.
     * @returns This instance.
     */
    easeValueTo(value?: number, min?: number, max?: number): this;
    /**
     * Stop value easing.
     * @returns This instance.
     */
    stopEaseValue(): this;
    /**
     * Set ease duration.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    setEaseValueDuration(duration: number): this;
    /**
     * Set ease function.
     * @param ease - Ease function name.
     * @returns This instance.
     */
    setEaseValueFunction(ease: string): this;

    /**
     * Track color.
     */
    trackColor: number;
    /**
     * Set track color.
     * @param color - Track color.
     * @returns This instance.
     */
    setTrackColor(color?: number): this;

    /**
     * Track stroke thickness.
     */
    trackStrokeThickness: number;
    /**
     * Track stroke color.
     */
    trackStrokeColor: number;
    /**
     * Set track stroke.
     * @param lineWidth - Stroke thickness.
     * @param color - Stroke color.
     * @returns This instance.
     */
    setTrackStroke(
        lineWidth?: number,
        color?: number
    ): this;

    /**
     * Bar color.
     */
    barColor: number;
    /**
     * Set bar color.
     * @param color - Bar color.
     * @returns This instance.
     */
    setBarColor(color?: number): this;

    /**
     * Skew x angle in radians.
     */
    skewX: number;
    /**
     * Set skew x angle in radians.
     * @param skewX - Skew x angle.
     * @returns This instance.
     */
    setSkewX(skewX: number): this;

    /**
     * Right-to-left flag.
     */
    rtl: boolean;
    /**
     * Set right-to-left flag.
     * @param enable - True to enable RTL.
     * @returns This instance.
     */
    setRTL(enable?: boolean): this;
}
