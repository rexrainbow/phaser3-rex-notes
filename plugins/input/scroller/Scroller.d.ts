import ComponentBase from '../../utils/componentbase/ComponentBase';

export default Scroller;

declare namespace Scroller {

    /**
     * Orientation identifiers.
     */
    type OrientationType = 0 | 1 | 'x' | 'y' | 'v' | 'vertical' | 'h' | 'horizontal';
    /**
     * Callback for value changes.
     */
    type ValueChangeCallbackType = (newValue: number, oldValue: number) => void;

    /**
     * Scroller configuration.
     */
    interface IConfig {
        /**
         * Bounds in order: bottom, top.
         */
        bounds?: [
            bottomBound: number,
            topBound: number
        ],
        /**
         * Initial value.
         */
        value?: number,
        /**
         * Snap step value.
         */
        snapStep?: number,
        /**
         * Drag threshold in pixels.
         */
        threshold?: number,
        /**
         * Sliding deceleration.
         */
        slidingDeceleration?: number,
        /**
         * Back deceleration.
         */
        backDeceleration?: number,

        /**
         * True to reverse drag direction.
         */
        dragReverse?: boolean,
        /**
         * Drag rate.
         */
        dragRate?: number,
        /**
         * True to release on pointer out.
         */
        pointerOutRelease?: boolean,
        /**
         * True to use rect bounds for interaction.
         */
        rectBoundsInteractive?: boolean,

        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * Scroller orientation.
         */
        orientation?: OrientationType,

        /**
         * Callback on value change.
         */
        valuechangeCallback?: ValueChangeCallbackType,
        /**
         * Callback scope for value change.
         */
        valuechangeCallbackScope?: Object,

        /**
         * Callback when over max.
         */
        overmaxCallback?: ValueChangeCallbackType,
        /**
         * Callback scope for over max.
         */
        overmaxCallbackScope?: Object,

        /**
         * Callback when over min.
         */
        overminCallback?: ValueChangeCallbackType,
        /**
         * Callback scope for over min.
         */
        overminCallbackScope?: Object,
    }

    namespace Events {
        /**
         * Value change callback.
         */
        type ValueChageCallbackType = (newValue: number, oldValue: number) => void;
    }
}

/**
 * Scroller input component.
 */
declare class Scroller extends ComponentBase {
    /**
     * Create a Scroller component.
     * @param gameObject - Target game object.
     * @param config - Scroller configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Scroller.IConfig
    );

    /**
     * Enable or disable scrolling.
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
     * Set bounds.
     * @param bound0 - Bottom or first bound.
     * @param bound1 - Top or second bound.
     * @returns This instance.
     */
    setBounds(bound0: number, bound1: number): this;
    /**
     * Set bounds by array.
     * @param bounds - Bounds array.
     * @returns This instance.
     */
    setBounds(bounds: [bottomBound: number, topBound: number]): this;

    /**
     * Set sliding deceleration.
     * @param dec - Deceleration value or false to disable.
     * @returns This instance.
     */
    setSlidingDeceleration(dec: number | false): this;
    /**
     * Set back deceleration.
     * @param dec - Deceleration value or false to disable.
     * @returns This instance.
     */
    setBackDeceleration(dec: number | false): this;

    /**
     * Set current value.
     * @param value - Value to set.
     * @param clamp - True to clamp within bounds.
     * @returns This instance.
     */
    setValue(value: number, clamp?: boolean): this;
    /**
     * Add to current value.
     * @param inc - Increment value.
     * @param clamp - True to clamp within bounds.
     * @returns This instance.
     */
    addValue(inc: number, clamp?: boolean): this;
    /**
     * Current value.
     */
    value: number;

    /**
     * Set snap step.
     * @param snapStep - Snap step value.
     * @returns This instance.
     */
    setSnapStep(snapStep?: number): this;

    /**
     * True if dragging is in progress.
     */
    readonly isDragging: boolean;

    /**
     * Current state value.
     */
    readonly state: string;
}
