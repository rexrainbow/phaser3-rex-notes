export default DropDown;

declare namespace DropDown {
    /**
     * Callback for transition in or out.
     */
    type TransitCallbackType = (
        /**
         * Target game object.
         */
        gameObject: Phaser.GameObjects.GameObject,
        /**
         * Transition duration in ms.
         */
        duration: number
    ) => void;

    /**
     * DropDown configuration.
     */
    interface IConfig {

        /**
         * Transition durations.
         */
        duration?: {
            /**
             * Duration for transit in.
             */
            in?: number,
            /**
             * Duration for transit out.
             */
            out?: number,
        },

        /**
         * Transit in callback.
         */
        transitIn?: TransitCallbackType,
        /**
         * Transit out callback.
         */
        transitOut?: TransitCallbackType,

        /**
         * Expand direction.
         */
        expandDirection?: 0 | 1 | 'down' | 'up',

        /**
         * Align target for both axes.
         */
        alignTarget?: Phaser.GameObjects.GameObject,
        /**
         * Align target for x axis.
         */
        alignTargetX?: Phaser.GameObjects.GameObject,
        /**
         * Align target for y axis.
         */
        alignTargetY?: Phaser.GameObjects.GameObject,
        /**
         * Align offset x.
         */
        alignOffsetX?: number,
        /**
         * Align offset y.
         */
        alignOffsetY?: number,
        /**
         * Align side string.
         */
        alignSide?: string,

        /**
         * Bounds rectangle.
         */
        bounds?: Phaser.Geom.Rectangle,

        /**
         * True to close on touch outside.
         */
        touchOutsideClose?: boolean,

        /**
         * True to close on any touch.
         */
        anyTouchClose?: boolean,

        /**
         * True to destroy on close.
         */
        destroy?: boolean,
    }
}

/**
 * Drop-down behavior for a game object.
 */
declare class DropDown extends Phaser.Events.EventEmitter {
    /**
     * Create a DropDown behavior.
     * @param gameObject - Target game object.
     * @param config - DropDown configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: DropDown.IConfig,
    );

    /**
     * Request to close the drop-down.
     * @param closeEventData - Event data for closing.
     * @returns This instance.
     */
    requestClose(closeEventData: any): this;
}
