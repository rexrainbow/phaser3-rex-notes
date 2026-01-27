import ComponentBase from '../../utils/componentbase/ComponentBase';

export default OpenCloseTransition;

declare namespace OpenCloseTransition {
    /**
     * Transition callback.
     */
    type TransitCallbackType = (
        /**
         * Target game object.
         */
        gameObject: Phaser.GameObjects.GameObject,
        /**
         * Duration in ms.
         */
        duration: number
    ) => void;

    /**
     * OpenCloseTransition configuration.
     */
    interface IConfig {

        /**
         * Transition durations.
         */
        duration?: {
            /**
             * Transit-in duration in ms.
             */
            in?: number,
            /**
             * Transit-out duration in ms.
             */
            out?: number,
        },

        /**
         * Transit-in callback.
         */
        transitIn?: TransitCallbackType,

        /**
         * Transit-out callback.
         */
        transitOut?: TransitCallbackType,

        /**
         * True to allow only one open/close.
         */
        oneShot?: boolean,
        /**
         * True to destroy on close.
         */
        destroy?: boolean,
        /**
         * True if opened at start.
         */
        opened?: boolean,
    }
}

/**
 * Open/close transition behavior for a game object.
 */
declare class OpenCloseTransition extends ComponentBase {
    /**
     * Create an OpenCloseTransition behavior.
     * @param gameObject - Target game object.
     * @param config - OpenCloseTransition configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: OpenCloseTransition.IConfig
    );

    /**
     * Set transit-in duration.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    setTransitInTime(duration: number): this;
    /**
     * Transit-in duration in ms.
     */
    transitInTime: number;

    /**
     * Set transit-out duration.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    setTransitOutTime(duration: number): this;
    /**
     * Transit-out duration in ms.
     */
    transitOutTime: number;

    /**
     * Set transit-in callback.
     * @param callback - Transit callback.
     * @returns This instance.
     */
    setTransitInCallback(
        callback?: OpenCloseTransition.TransitCallbackType
    ): this;
    /**
     * Transit-in callback.
     */
    transitInCallback: OpenCloseTransition.TransitCallbackType;

    /**
     * Set transit-out callback.
     * @param callback - Transit callback.
     * @returns This instance.
     */
    setTransitOutCallback(
        callback?: OpenCloseTransition.TransitCallbackType
    ): this;
    /**
     * Transit-out callback.
     */
    transitOutCallback: OpenCloseTransition.TransitCallbackType;

    /**
     * Request to open.
     * @param openEventData - Event data for opening.
     * @param duration - Override duration in ms.
     * @returns This instance.
     */
    requestOpen(openEventData?: any, duration?: number): this;
    /**
     * Hook called on open.
     */
    onOpen(): void;

    /**
     * Request to close.
     * @param closeEventData - Event data for closing.
     * @param duration - Override duration in ms.
     * @returns This instance.
     */
    requestClose(closeEventData?: any, duration?: number): this;
    /**
     * Hook called on close.
     */
    onClose(): void;
}
