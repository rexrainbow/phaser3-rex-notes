import ComponentBase from '../../utils/componentbase/ComponentBase';

export default Drag;

declare namespace Drag {
    /**
     * Axis mode identifiers.
     */
    type AixsModeType = 0 | 1 | 2 | 'both' | 'h&v' | 'horizontal' | 'h' | 'vertical' | 'v';

    /**
     * Drag configuration.
     */
    interface IConfig {
        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * Axis mode.
         */
        axis?: AixsModeType,
        /**
         * Axis rotation in radians.
         */
        rotation?: number
    }
}

/**
 * Drag input component for a game object.
 */
declare class Drag extends ComponentBase {
    /**
     * Create a drag component.
     * @param gameObject - Target game object.
     * @param config - Drag configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Drag.IConfig
    );

    /**
     * Enable or disable dragging.
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
     * Set axis rotation.
     * @param rad - Rotation in radians.
     * @returns This instance.
     */
    setAxisRotation(rad?: number): this;
    /**
     * Axis rotation in radians.
     */
    axisRotation: number;

    /**
     * Set axis mode.
     * @param axisMode - Axis mode.
     * @returns This instance.
     */
    setAxisMode(axisMode: Drag.AixsModeType): this;
    /**
     * Axis mode value.
     */
    axisMode: number;

    /**
     * Start dragging.
     * @returns This instance.
     */
    drag(): this;
    /**
     * End dragging.
     * @returns This instance.
     */
    dragend(): this;

}
