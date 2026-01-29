// import * as Phaser from 'phaser';


export default OnePointerTracer;

declare namespace OnePointerTracer {

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
     * OnePointerTracer configuration.
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
 * Base class for one-pointer gesture tracking.
 */
declare class OnePointerTracer extends Phaser.Events.EventEmitter {

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
     * Active pointer.
     */
    pointer: Phaser.Input.Pointer | undefined;
    /**
     * Last active pointer.
     */
    lastPointer: Phaser.Input.Pointer | undefined;

    /**
     * Test if the pointer is in a game object.
     * @param gameObject - Target game object.
     * @param preTest - Optional pre-test callback.
     * @param postTest - Optional post-test callback.
     * @returns True if the pointer is in the game object.
     */
    isPointerInGameObject(
        gameObject: Phaser.GameObjects.GameObject,
        preTest?: OnePointerTracer.HitTestCallbackType,
        postTest?: OnePointerTracer.HitTestCallbackType
    ): boolean;

    /**
     * Cancel dragging.
     * @returns This instance.
     */
    dragCancel(): this;

}
