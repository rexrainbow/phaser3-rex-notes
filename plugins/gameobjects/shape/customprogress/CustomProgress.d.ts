import CustomShapes from '../customshapes/CustomShapes';

export default CustomProgress;

declare namespace CustomProgress {
    type Arc = CustomShapes.Arc;
    type Circle = CustomShapes.Circle;
    type Curve = CustomShapes.Curve;
    type Ellipse = CustomShapes.Ellipse;
    type Line = CustomShapes.Line;
    type Lines = CustomShapes.Lines;
    type Rectangle = CustomShapes.Rectangle;
    type RoundRectangle = CustomShapes.RoundRectangle;
    type Triangle = CustomShapes.Triangle;
    type ShapeTypes = Arc | Circle | Curve | Ellipse |
        Line | Lines | Rectangle | RoundRectangle | Triangle;

    /**
     * Callback fired when value changes.
     * @param newValue - New value.
     * @param oldValue - Previous value.
     * @param customProgress - Custom progress instance.
     */
    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        customProgress: CustomProgress
    ) => void;

    interface IConfig extends Omit<CustomShapes.IConfig, 'update'> {
        /**
         * Initial value.
         */
        value?: number,

        /**
         * Update callback.
         */
        update?: (this: CustomProgress) => void;

        /**
         * Ease configuration for value changes.
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
        valuechangeCallback?: ValueChangeCallbackType,
    }

    namespace Events {
        /**
         * Fired when value changes.
         * @param newValue - New value.
         * @param oldValue - Previous value.
         * @param customProgress - Custom progress instance.
         */
        type ValueChangeCallbackType = (
            newValue: number,
            oldValue: number,
            customProgress: CustomProgress
        ) => void;
    }
}

/**
 * Custom shapes progress indicator with easing support.
 */
declare class CustomProgress extends CustomShapes {
    /**
     * Create a custom progress.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - The width.
     * @param height - The height.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: CustomProgress.IConfig
    );

    /**
     * Create a custom progress from config.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: CustomProgress.IConfig
    );

    /**
     * Center x.
     */
    readonly centerX: number;
    /**
     * Center y.
     */
    readonly centerY: number;
    /**
     * Radius value.
     */
    readonly radius: number;

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
}
