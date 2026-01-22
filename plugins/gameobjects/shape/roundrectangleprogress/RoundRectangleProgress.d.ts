import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default RoundRectangleProgress;

declare namespace RoundRectangleProgress {

    /**
     * Callback fired when value changes.
     * @param newValue - New value.
     * @param oldValue - Previous value.
     * @param circularProgress - Progress instance.
     */
    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        circularProgress: RoundRectangleProgress
    ) => void;

    /**
     * Resolved corner radius values.
     */
    type CornerRadiusType = {
        /**
         * Radius x value.
         */
        x: number,
        /**
         * Radius y value.
         */
        y: number,
        /**
         * True if the corner is convex.
         */
        convex: boolean
    };

    type RadiusType = number | { x?: number, y?: number };

    interface IRadiusConfig {
        /**
         * Top-left radius.
         */
        tl?: RadiusType,
        /**
         * Top-right radius.
         */
        tr?: RadiusType,
        /**
         * Bottom-left radius.
         */
        bl?: RadiusType,
        /**
         * Bottom-right radius.
         */
        br?: RadiusType,

        /**
         * Shared radius x value.
         */
        x?: number,
        /**
         * Shared radius y value.
         */
        y?: number,
    }

    /**
     * Orientation identifiers.
     */
    type OrientationTypes = 0 | 1 | 'x' | 'y' | 'h' | 'v' | 'horizontal' | 'vertical' | 'left-to-right' | 'top-to-bottom';

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
         * Radius value or configuration.
         */
        radius?: number | IRadiusConfig |
        ({
            radius?: (number | IRadiusConfig),
            iteration?: number
        }),

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
         * Right-to-left flag.
         */
        rtl?: boolean,
        /**
         * Orientation value.
         */
        orientation?: OrientationTypes,

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
            circularProgress: RoundRectangleProgress
        ) => void;
    }
}

/**
 * Rounded-rectangle progress shape with track and bar styling.
 */
declare class RoundRectangleProgress extends BaseShapes {
    /**
     * Create a rounded-rectangle progress.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: RoundRectangleProgress.IConfig
    );

    /**
     * Create a rounded-rectangle progress.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - Width of the progress bar.
     * @param height - Height of the progress bar.
     * @param radiusConfig - Radius configuration.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        radiusConfig?: number | RoundRectangleProgress.IRadiusConfig |
            ({
                radius?: (number | RoundRectangleProgress.IRadiusConfig),
                iteration?: number
            }),
        config?: RoundRectangleProgress.IConfig
    );

    /**
     * Create a rounded-rectangle progress.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - Width of the progress bar.
     * @param height - Height of the progress bar.
     * @param radiusConfig - Radius configuration.
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
        radiusConfig?: number | RoundRectangleProgress.IRadiusConfig |
            ({
                radius?: (number | RoundRectangleProgress.IRadiusConfig),
                iteration?: number
            }),
        barColor?: string | number,
        value?: number,
        config?: RoundRectangleProgress.IConfig
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
     * Right-to-left flag.
     */
    rtl: boolean;
    /**
     * Set right-to-left flag.
     * @param enable - True to enable RTL.
     * @returns This instance.
     */
    setRTL(enable?: boolean): this;

    /**
     * Orientation value.
     */
    orientation: number;
    /**
     * Set orientation.
     * @param orientation - Orientation value.
     * @returns This instance.
     */
    setOrientation(orientation: RoundRectangleProgress.OrientationTypes): this;

    /**
     * Iteration count.
     */
    iteration: number;
    /**
     * Set iteration count.
     * @param iteration - Iteration count.
     * @returns This instance.
     */
    setIteration(iteration: number): this;

    /**
     * Radius value.
     */
    radius: number;
    /**
     * Set radius value.
     * @param value - Radius value or config.
     * @returns This instance.
     */
    setRadius(
        value: number | RoundRectangleProgress.IRadiusConfig
    ): this;

    /**
     * Top-left radius value.
     */
    radiusTL: number;
    /**
     * Set top-left radius.
     * @param value - Radius value or config.
     * @returns This instance.
     */
    setRadiusTL(
        value: number | RoundRectangleProgress.IRadiusConfig
    ): this;

    /**
     * Top-right radius value.
     */
    radiusTR: number;
    /**
     * Set top-right radius.
     * @param value - Radius value or config.
     * @returns This instance.
     */
    setRadiusTR(
        value: number | RoundRectangleProgress.IRadiusConfig
    ): this;

    /**
     * Bottom-left radius value.
     */
    radiusBL: number;
    /**
     * Set bottom-left radius.
     * @param value - Radius value or config.
     * @returns This instance.
     */
    setRadiusBL(
        value: number | RoundRectangleProgress.IRadiusConfig
    ): this;

    /**
     * Bottom-right radius value.
     */
    radiusBR: number;
    /**
     * Set bottom-right radius.
     * @param value - Radius value or config.
     * @returns This instance.
     */
    setRadiusBR(
        value: number | RoundRectangleProgress.IRadiusConfig
    ): this;

    /**
     * Resolved corner radius values.
     */
    readonly cornerRadius: {
        tl: RoundRectangleProgress.CornerRadiusType,
        tr: RoundRectangleProgress.CornerRadiusType,
        bl: RoundRectangleProgress.CornerRadiusType,
        br: RoundRectangleProgress.CornerRadiusType,
    };
}
