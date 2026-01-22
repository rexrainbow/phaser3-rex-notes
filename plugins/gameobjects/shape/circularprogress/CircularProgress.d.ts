import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default CircularProgress;

declare namespace CircularProgress {

    /**
     * Callback fired when value changes.
     * @param newValue - New value.
     * @param oldValue - Previous value.
     * @param circularProgress - Progress instance.
     */
    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        circularProgress: CircularProgress
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
         * Radius value.
         */
        radius?: number,

        /**
         * Bar color.
         */
        barColor?: string | number,
        /**
         * Bar alpha.
         */
        barAlpha?: number,
        /**
         * Track color.
         */
        trackColor?: string | number,
        /**
         * Track alpha.
         */
        trackAlpha?: number,
        /**
         * Center color.
         */
        centerColor?: string | number,
        /**
         * Center alpha.
         */
        centerAlpha?: number,
        /**
         * Bar thickness.
         */
        thickness?: number,
        /**
         * Start angle in radians.
         */
        startAngle?: number,
        /**
         * True to draw anticlockwise.
         */
        anticlockwise?: boolean,

        /**
         * Iteration count.
         */
        iterations?: number,

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
            circularProgress: CircularProgress
        ) => void;
    }
}

/**
 * Circular progress shape with value easing support.
 */
declare class CircularProgress extends BaseShapes {
    /**
     * Create a circular progress.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: CircularProgress.IConfig
    );

    /**
     * Create a circular progress.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param radius - Radius value.
     * @param barColor - Bar color.
     * @param value - Initial value.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        radius?: number,
        barColor?: string | number,
        value?: number,
        config?: CircularProgress.IConfig
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
     * Radius value.
     */
    radius: number;
    /**
     * Set radius.
     * @param radius - Radius value.
     * @returns This instance.
     */
    setRadius(radius: number): this;

    /**
     * Track color.
     */
    trackColor: string;
    /**
     * Set track color.
     * @param trackColor - Track color.
     * @returns This instance.
     */
    setTrackColor(trackColor?: string | number): this;

    /**
     * Set bar thickness.
     * @param thickness - Thickness value.
     * @returns This instance.
     */
    setThickness(thickness: number): this;

    /**
     * Bar color.
     */
    barColor: string;
    /**
     * Set bar color.
     * @param barColor - Bar color.
     * @returns This instance.
     */
    setBarColor(barColor?: string | number): this;

    /**
     * Start angle.
     */
    startAngle: number;
    /**
     * Set start angle.
     * @param startAngle - Start angle in radians.
     * @returns This instance.
     */
    setStartAngle(startAngle: number): this;

    /**
     * Anticlockwise flag.
     */
    anticlockwise: boolean;
    /**
     * Set anticlockwise flag.
     * @param anticlockwise - True to draw anticlockwise.
     * @returns This instance.
     */
    setAnticlockwise(anticlockwise: boolean): this;

    /**
     * Center color.
     */
    centerColor: string;
    /**
     * Set center color.
     * @param centerColor - Center color.
     * @returns This instance.
     */
    setCenterColor(centerColor?: string | number): this;
}
