// import * as Phaser from 'phaser';

export default TwoPointersTracer;

declare namespace TwoPointersTracer {
    /**
     * Pointer hit test callback.
     */
    type HitTestCallbackType = (
        /**
         * Target game object.
         */
        gameObject: Phaser.GameObjects.GameObject,
        /**
         * Pointer x.
         */
        x: number,
        /**
         * Pointer y.
         */
        y: number
    ) => boolean;

    /**
     * TwoPointersTracer configuration.
     */
    interface IConfig {
        /**
         * True to enable.
         */
        enable?: boolean,
        /**
         * Detection bounds.
         */
        bounds?: Phaser.Geom.Rectangle,
        /**
         * Event emitter override or true to use game object emitter.
         */
        eventEmitter?: boolean | Phaser.Events.EventEmitter,
    }

}

/**
 * Base class for two-pointer gesture tracking.
 */
declare class TwoPointersTracer extends Phaser.Events.EventEmitter {

    /**
     * True if enabled.
     */
    enable: boolean;
    /**
     * Enable or disable the tracer.
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
     * Detection bounds.
     */
    bounds: Phaser.Geom.Rectangle | undefined;
    /**
     * Set detection bounds.
     * @param bounds - Bounds rectangle.
     * @returns This instance.
     */
    setDetectBounds(bounds?: Phaser.Geom.Rectangle): this;

    /**
     * Cancel dragging.
     * @returns This instance.
     */
    dragCancel(): this;

    /**
     * Active pointers.
     */
    pointers: Phaser.Input.Pointer[];
    /**
     * Distance between pointers.
     */
    readonly distanceBetween: number;
    /**
     * Angle between pointers in radians.
     */
    readonly angleBetween: number;
    /**
     * Center x between pointers.
     */
    readonly centerX: number;
    /**
     * Center y between pointers.
     */
    readonly centerY: number;
    /**
     * Previous center x.
     */
    readonly prevCenterX: number;
    /**
     * Previous center y.
     */
    readonly prevCenterY: number;
    /**
     * Movement delta x of center.
     */
    readonly movementCenterX: number;
    /**
     * Movement delta y of center.
     */
    readonly movementCenterY: number;
    /**
     * Drag vector for pointer 1.
     */
    readonly drag1Vector: { x: number, y: number };

    /**
     * Test if pointer 0 is in a game object.
     * @param gameObject - Target game object.
     * @param preTest - Optional pre-test callback.
     * @param postTest - Optional post-test callback.
     * @returns True if pointer 0 is in the game object.
     */
    isPointer0InGameObject(
        gameObject: Phaser.GameObjects.GameObject,
        preTest?: TwoPointersTracer.HitTestCallbackType,
        postTest?: TwoPointersTracer.HitTestCallbackType
    ): boolean;

    /**
     * Test if pointer 1 is in a game object.
     * @param gameObject - Target game object.
     * @param preTest - Optional pre-test callback.
     * @param postTest - Optional post-test callback.
     * @returns True if pointer 1 is in the game object.
     */
    isPointer1InGameObject(
        gameObject: Phaser.GameObjects.GameObject,
        preTest?: TwoPointersTracer.HitTestCallbackType,
        postTest?: TwoPointersTracer.HitTestCallbackType
    ): boolean;
}
