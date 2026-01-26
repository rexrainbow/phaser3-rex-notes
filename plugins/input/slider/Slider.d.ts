import ComponentBase from '../../utils/componentbase/ComponentBase';

export default Slider;

declare namespace Slider {
    /**
     * Callback for value changes.
     */
    type ValueChangeCallbackType = (newValue: number, oldValue: number) => void;

    /**
     * Slider configuration.
     */
    interface IConfig {
        /**
         * End points for the slider.
         */
        endPoints?: [
            { x: number, y: number },
            { x: number, y: number }
        ],
        /**
         * Initial value.
         */
        value?: number,
        /**
         * True to enable.
         */
        enable?: boolean,

        /**
         * Callback on value change.
         */
        valuechangeCallback?: ValueChangeCallbackType,
        /**
         * Callback scope for value change.
         */
        valuechangeCallbackScope?: Object
    }

    namespace Events {
        /**
         * Value change callback.
         */
        type ValueChangeCallbackType = (newValue: number, oldValue: number) => void;
    }
}

/**
 * Slider input component.
 */
declare class Slider extends ComponentBase {
    /**
     * Create a Slider component.
     * @param gameObject - Target game object.
     * @param config - Slider configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Slider.IConfig
    );

    /**
     * Enable or disable the slider.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Toggle enable state.
     * @returns This instance.
     */
    toggleEnable(): this;
    /**
     * True if enabled.
     */
    enable: boolean;

    /**
     * Set end points by coordinates.
     * @param p0x - Start x.
     * @param p0y - Start y.
     * @param p1x - End x.
     * @param p1y - End y.
     * @returns This instance.
     */
    setEndPoints(
        p0x: number,
        p0y: number,
        p1x: number,
        p1y: number
    ): this;

    /**
     * Set end points by point objects.
     * @param p0 - Start point.
     * @param p1 - End point.
     * @returns This instance.
     */
    setEndPoints(
        p0: { x: number, y: number },
        p1: { x: number, y: number }
    ): this;

    /**
     * Set end points by array.
     * @param points - End points array.
     * @returns This instance.
     */
    setEndPoints(
        points: [
            { x: number, y: number },
            { x: number, y: number }
        ]
    ): this;

    /**
     * Get value within optional range.
     * @param min - Minimum value.
     * @param max - Maximum value.
     * @returns Current value.
     */
    getValue(min?: number, max?: number): number;
    /**
     * Current value.
     */
    value: number;

    /**
     * Set current value.
     * @param newValue - Value to set.
     * @param min - Minimum value.
     * @param max - Maximum value.
     * @returns This instance.
     */
    setValue(
        newValue: number,
        min?: number,
        max?: number
    ): this;

    /**
     * Add to current value.
     * @param inc - Increment value.
     * @param min - Minimum value.
     * @param max - Maximum value.
     * @returns This instance.
     */
    addValue(
        inc: number,
        min?: number,
        max?: number
    ): this;

    /**
     * True if dragging is in progress.
     */
    readonly isDragging: boolean;
}
