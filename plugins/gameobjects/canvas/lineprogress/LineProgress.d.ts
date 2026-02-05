import Canvas from '../canvas/Canvas';

// import * as Phaser from 'phaser';
export default LineProgress;

declare namespace LineProgress {

    /**
     * Callback fired when progress value changes.
     */
    type ValueChangeCallbackType = (
        /**
         * New normalized value.
         */
        newValue: number,
        /**
         * Previous normalized value.
         */
        oldValue: number,
        /**
         * Line progress instance.
         */
        circularProgress: LineProgress
    ) => void;

    /**
     * Configuration options for creating line progress canvas.
     */
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
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,
        /**
         * Canvas texture resolution scale.
         */
        resolution?: number,

        /**
         * Track fill color.
         */
        trackColor?: string | number,
        /**
         * Track thickness.
         */
        trackThickness?: number,
        /**
         * Track stroke color.
         */
        trackStrokeColor?: string | number,
        /**
         * Bar primary color.
         */
        barColor?: string | number,
        /**
         * Bar secondary color for gradient.
         */
        barColor2?: string | number,
        /**
         * Set to true to use horizontal gradient direction.
         */
        isHorizontalGradient?: boolean,

        /**
         * X skew amount.
         */
        skewX?: number,

        /**
         * Set to true for right-to-left fill direction.
         */
        rtl?: boolean,

        /**
         * Initial normalized value.
         */
        value?: number,

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
    }

    /**
     * Event callback types emitted by line progress.
     */
    namespace Events {
        /**
         * Callback fired when progress value changes.
         */
        type ValueChangeCallbackType = (
            /**
             * New normalized value.
             */
            newValue: number,
            /**
             * Previous normalized value.
             */
            oldValue: number,
            /**
             * Line progress instance.
             */
            circularProgress: LineProgress
        ) => void;
    }
}

/**
 * Canvas-based line progress bar game object.
 */
declare class LineProgress extends Canvas {
    /**
     * Create line progress by configuration object.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional progress configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: LineProgress.IConfig
    );

    /**
     * Create line progress with position and size.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param config - Optional progress configuration.
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
     * Create line progress with quick bar color and value setup.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param barColor - Bar color.
     * @param value - Initial normalized value.
     * @param config - Optional progress configuration.
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
     * Current normalized value.
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
     * @returns This game object.
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
     * @returns This game object.
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
     * @returns This game object.
     */
    easeValueTo(
        value?: number,
        min?: number,
        max?: number
    ): this;
    /**
     * Stop current value easing.
     *
     * @returns This game object.
     */
    stopEaseValue(): this;
    /**
     * Set ease duration.
     *
     * @param duration - Duration in milliseconds.
     * @returns This game object.
     */
    setEaseValueDuration(duration: number): this;
    /**
     * Set ease function.
     *
     * @param ease - Ease function name.
     * @returns This game object.
     */
    setEaseValueFunction(ease: string): this;

    /**
     * Current track color.
     */
    trackColor: string;
    /**
     * Set track color.
     *
     * @param radius - Track color value.
     * @returns This game object.
     */
    setTrackColor(radius?: string | number): this;

    /**
     * Current track stroke thickness.
     */
    trackStrokeThickness: number;
    /**
     * Current track stroke color.
     */
    trackStrokeColor: string;
    /**
     * Set track stroke style.
     *
     * @param lineWidth - Stroke thickness.
     * @param color - Stroke color.
     * @returns This game object.
     */
    setTrackStroke(
        lineWidth?: number,
        color?: string | number
    ): this;

    /**
     * Current bar primary color.
     */
    barColor: string;
    /**
     * Current bar secondary color.
     */
    barColor2: string;
    /**
     * Current gradient direction flag.
     */
    isHorizontalGradient: boolean;
    /**
     * Set bar colors and gradient direction.
     *
     * @param barColor - Primary bar color.
     * @param barColor2 - Secondary bar color.
     * @param isHorizontalGradient - True for horizontal gradient.
     * @returns This game object.
     */
    setBarColor(
        barColor?: string | number,
        barColor2?: string | number,
        isHorizontalGradient?: boolean
    ): this;

    /**
     * Current X skew value.
     */
    skewX: number;
    /**
     * Set X skew value.
     *
     * @param skewX - X skew amount.
     * @returns This game object.
     */
    setSkewX(skewX: number): this;

    /**
     * Current right-to-left flag.
     */
    rtl: boolean;
    /**
     * Set right-to-left fill direction.
     *
     * @param enable - True to enable right-to-left direction.
     * @returns This game object.
     */
    setRTL(enable?: boolean): this;
}
