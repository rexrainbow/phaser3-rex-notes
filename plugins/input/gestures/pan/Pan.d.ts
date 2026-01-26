// import * as Phaser from 'phaser';
import OnePointerTracer from '../onepointertracer/OnePointerTracer';


export default Pan;

declare namespace Pan {

    /**
     * Pan configuration.
     */
    interface IConfig extends OnePointerTracer.IConfig {
        /**
         * Drag threshold in pixels.
         */
        threshold?: number,
    }

    namespace Events {
        /**
         * Pan callback.
         */
        type PanCallbackType = (
            /**
             * Pan component.
             */
            pan: Pan,
            /**
             * Target game object.
             */
            gameObject: Phaser.GameObjects.GameObject,
            /**
             * Last pointer input.
             */
            lastPointer: Phaser.Input.Pointer
        ) => void;
    }
}

/**
 * Pan gesture component.
 */
declare class Pan extends OnePointerTracer {
    /**
     * Create a Pan component.
     * @param gameObject - Target game object or scene.
     * @param config - Pan configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject | Phaser.Scene,
        config?: Pan.IConfig
    );

    /**
     * Delta x in local space.
     */
    dx: number;
    /**
     * Delta y in local space.
     */
    dy: number;
    /**
     * Current x in local space.
     */
    x: number;
    /**
     * Current y in local space.
     */
    y: number;

    /**
     * Delta x in world space.
     */
    dWorldX: number;
    /**
     * Delta y in world space.
     */
    dWorldY: number;
    /**
     * Current x in world space.
     */
    worldX: number;
    /**
     * Current y in world space.
     */
    worldY: number;

    /**
     * Set drag threshold.
     * @param distance - Threshold distance in pixels.
     * @returns This instance.
     */
    setDragThreshold(distance: number): this;
    /**
     * Drag threshold in pixels.
     */
    dragThreshold: number;

    /**
     * True if panning is in progress.
     */
    readonly isPanning: boolean;
    /**
     * True if a pan has occurred.
     */
    readonly isPanned: boolean;
}
