import Canvas from '../canvas/Canvas';

export default CircularProgressCanvas;

declare namespace CircularProgressCanvas {

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
         * Circular progress instance.
         */
        circularProgress: CircularProgressCanvas
    ) => void;

    /**
     * Callback used to format center text.
     */
    type TextFormatCallbackType = (
        /**
         * Current normalized value.
         */
        value: number
    ) => string;

    /**
     * Configuration options for creating circular progress canvas.
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
         * Radius of circular progress.
         */
        radius?: number,
        /**
         * Canvas texture resolution scale.
         */
        resolution?: number,

        /**
         * Bar primary color.
         */
        barColor?: string | number,
        /**
         * Bar secondary color.
         */
        barColor2?: string | number,
        /**
         * Track color.
         */
        trackColor?: string | number,
        /**
         * Center fill color.
         */
        centerColor?: string | number,
        /**
         * Ring thickness.
         */
        thickness?: number,
        /**
         * Start angle in radians.
         */
        startAngle?: number,
        /**
         * End angle in radians.
         */
        endAngle?: number,
        /**
         * Set to true to draw anticlockwise.
         */
        anticlockwise?: boolean,

        /**
         * Center text color.
         */
        textColor?: string | number,
        /**
         * Center text stroke color.
         */
        textStrokeColor?: string | number,
        /**
         * Center text stroke thickness.
         */
        textStrokeThickness?: number,
        /**
         * Center text font size.
         */
        textSize?: string,
        /**
         * Center text font family.
         */
        textFamily?: string,
        /**
         * Center text font style.
         */
        textStyle?: string,
        /**
         * Callback used to format center text from value.
         */
        textFormatCallback?: TextFormatCallbackType,
        /**
         * Scope used when invoking text format callback.
         */
        textFormatCallbackScope?: object,

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
     * Event callback types emitted by circular progress.
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
             * Circular progress instance.
             */
            circularProgress: CircularProgressCanvas
        ) => void;
    }
}

/**
 * Canvas-based circular progress game object.
 */
declare class CircularProgressCanvas extends Canvas {
    /**
     * Create circular progress by configuration object.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional progress configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: CircularProgressCanvas.IConfig
    );

    /**
     * Create circular progress with quick position and style setup.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param radius - Circle radius.
     * @param barColor - Bar primary color.
     * @param value - Initial normalized value.
     * @param config - Optional progress configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        radius?: number,
        barColor?: string | number,
        value?: number,
        config?: CircularProgressCanvas.IConfig
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
     * Current radius.
     */
    radius: number;
    /**
     * Set radius.
     *
     * @param radius - Radius value.
     * @returns This game object.
     */
    setRadius(radius: number): this;

    /**
     * Current track color.
     */
    trackColor: string;
    /**
     * Set track color.
     *
     * @param trackColor - Track color value.
     * @returns This game object.
     */
    setTrackColor(trackColor?: string | number): this;

    /**
     * Set ring thickness.
     *
     * @param thickness - Thickness value.
     * @returns This game object.
     */
    setThickness(thickness: number): this;

    /**
     * Current bar primary color.
     */
    barColor: string;
    /**
     * Set bar primary color.
     *
     * @param color - Bar color value.
     * @returns This game object.
     */
    setBarColor(color?: string | number): this;

    /**
     * Current bar secondary color.
     */
    barColor2: string;
    /**
     * Set bar secondary color.
     *
     * @param color - Bar secondary color value.
     * @returns This game object.
     */
    setBarColor2(color?: string | number): this;

    /**
     * Current start angle in radians.
     */
    startAngle: number;
    /**
     * Set start angle.
     *
     * @param startAngle - Start angle in radians.
     * @returns This game object.
     */
    setStartAngle(startAngle: number): this;

    /**
     * Current end angle in radians.
     */
    endAngle: number;
    /**
     * Set end angle.
     *
     * @param endAngle - End angle in radians.
     * @returns This game object.
     */
    setEndAngle(endAngle: number): this;

    /**
     * Current anticlockwise flag.
     */
    anticlockwise: boolean;
    /**
     * Set anticlockwise mode.
     *
     * @param anticlockwise - True to draw anticlockwise.
     * @returns This game object.
     */
    setAnticlockwise(anticlockwise: boolean): this;

    /**
     * Current center color.
     */
    centerColor: string;
    /**
     * Set center color.
     *
     * @param centerColor - Center color value.
     * @returns This game object.
     */
    setCenterColor(centerColor?: string | number): this;

    /**
     * Current text color.
     */
    textColor: string;
    /**
     * Set text color.
     *
     * @param color - Text color value.
     * @returns This game object.
     */
    setTextColor(color?: string | number): this;

    /**
     * Current text stroke color.
     */
    textStrokeColor: string;
    /**
     * Current text stroke thickness.
     */
    textStrokeThickness: number;
    /**
     * Set text stroke style.
     *
     * @param color - Stroke color.
     * @param thickness - Stroke thickness.
     * @returns This game object.
     */
    setTextStrokeColor(
        color?: string | number,
        thickness?: number
    ): this;

    /**
     * Current text font string.
     */
    textFont: string;
    /**
     * Set text font by parts.
     *
     * @param fontSize - Font size string.
     * @param fontFamily - Font family string.
     * @param fontStyle - Font style string.
     * @returns This game object.
     */
    setTextFont(
        fontSize: string,
        fontFamily: string,
        fontStyle: string
    ): this;
    /**
     * Set text font by full CSS font string.
     *
     * @param font - Full font string.
     * @returns This game object.
     */
    setTextFont(font: string): this;

    /**
     * Set text format callback.
     *
     * @param callback - Callback used to format value text.
     * @param scope - Optional callback execution scope.
     * @returns This game object.
     */
    setTextFormatCallback(
        callback: CircularProgressCanvas.TextFormatCallbackType,
        scope?: object
    ): this;
}
