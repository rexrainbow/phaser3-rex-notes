import ComponentBase from '../../utils/componentbase/ComponentBase';

export default DragRotate;

declare namespace DragRotate {
    /**
     * DragRotate configuration.
     */
    interface IConfig {
        /**
         * Origin game object.
         */
        origin?: Phaser.GameObjects.GameObject,
        /**
         * Origin x.
         */
        x?: number,
        /**
         * Origin y.
         */
        y?: number,
        /**
         * Maximum radius.
         */
        maxRadius?: number,
        /**
         * Minimum radius.
         */
        minRadius?: number,
        /**
         * True to enable.
         */
        enable?: boolean,
    }

    namespace Evenets {
        /**
         * Drag callback.
         */
        type DragCallbackType = (
            /**
             * DragRotate component.
             */
            dragRotate: DragRotate
        ) => void;
    }
}

/**
 * Drag rotate input component.
 */
declare class DragRotate extends ComponentBase {
    /**
     * Create a DragRotate component.
     * @param scene - The Scene to which this component belongs.
     * @param config - DragRotate configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: DragRotate.IConfig
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
     * Set origin position.
     * @param x - Origin x.
     * @param y - Origin y.
     * @returns This instance.
     */
    setOrigin(x: number, y: number): this;
    /**
     * Set origin position from a pointer-like object.
     * @param pointer - Pointer with x and y.
     * @returns This instance.
     */
    setOrigin(pointer: { x: number, y: number }): this;
    /**
     * Set origin from a game object.
     * @param gameObject - Origin game object.
     * @returns This instance.
     */
    setOrigin(gameObject?: Phaser.GameObjects.GameObject): this;
    /**
     * Origin x.
     */
    x: number;
    /**
     * Origin y.
     */
    y: number;
    /**
     * Origin game object.
     */
    originGameObject: Phaser.GameObjects.GameObject;

    /**
     * Set radius limits.
     * @param maxRadius - Maximum radius.
     * @param minRadius - Minimum radius.
     * @returns This instance.
     */
    setRadius(maxRadius: number, minRadius?: number): this;
    /**
     * Maximum radius.
     */
    maxRadius: number;
    /**
     * Minimum radius.
     */
    minRadius: number;

    /**
     * Delta rotation in radians.
     */
    readonly deltaRotation: number;
    /**
     * Delta angle in radians.
     */
    readonly deltAangle: number;
    /**
     * True if rotating clockwise.
     */
    readonly cw: boolean;
    /**
     * True if rotating counter-clockwise.
     */
    readonly ccw: boolean;

    /**
     * Cancel dragging.
     * @returns This instance.
     */
    dragCancel(): this;

    /**
     * Active pointer.
     */
    readonly pointer: Phaser.Input.Pointer;
    /**
     * True if dragging.
     */
    readonly isDrag: boolean;
    /**
     * Current state value.
     */
    readonly state: number;
}
