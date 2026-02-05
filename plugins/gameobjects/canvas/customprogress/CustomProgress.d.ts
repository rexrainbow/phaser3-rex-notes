import Canvas from '../canvasbase/Canvas';

export default CustomProgress;

declare namespace CustomProgress {
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
         * Custom progress instance.
         */
        customProgress: CustomProgress
    ) => void;

    /**
     * Callback used to redraw custom progress content.
     */
    type UpdateCallbackType = (
        /**
         * Custom progress instance.
         */
        this: CustomProgress
    ) => void;

    /**
     * Configuration options for creating custom progress canvas.
     */
    interface IConfig {
        /**
         * Initial normalized value.
         */
        value?: number,

        /**
         * Custom draw update callback.
         */
        update?: UpdateCallbackType;

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
        valuechangeCallback?: ValueChangeCallbackType,
    }

    /**
     * Event callback types emitted by custom progress.
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
             * Custom progress instance.
             */
            customProgress: CustomProgress
        ) => void;
    }
}

/**
 * Canvas-based progress object with custom drawing callback.
 */
declare class CustomProgress extends Canvas {
    /**
     * Create custom progress by configuration object.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional progress configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: CustomProgress.IConfig
    );

    /**
     * Create custom progress with position and size.
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
        config?: CustomProgress.IConfig
    );

    /**
     * Center x coordinate in local canvas space.
     */
    readonly centerX: number;
    /**
     * Center y coordinate in local canvas space.
     */
    readonly centerY: number;
    /**
     * Radius derived from current canvas size.
     */
    readonly radius: number;

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
}
