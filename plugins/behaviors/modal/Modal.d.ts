import OpenCloseTransition from '../openclosetransition/OpenCloseTransition';

export default Modal;

declare namespace Modal {
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
     * Modal configuration.
     */
    interface IConfig {
        /**
         * Cover configuration.
         */
        cover?: {
            /**
             * Cover color value.
             */
            color?: number,
            /**
             * Cover alpha value.
             */
            alpha?: number,
            /**
             * Cover transit-in callback.
             */
            transitIn?: TransitCallbackType | null,
            /**
             * Cover transit-out callback.
             */
            transitOut?: TransitCallbackType | null,
        },

        /**
         * True to close on touch outside.
         */
        touchOutsideClose?: boolean,        
        /**
         * True to close on any touch.
         */
        anyTouchClose?: boolean,

        /**
         * True to close on timeout.
         */
        timeOutClose?: boolean,

        /**
         * True to require manual close.
         */
        manualClose?: boolean,

        /**
         * Durations for open/hold/close.
         */
        duration?: {
            /**
             * Transit-in duration in ms.
             */
            in?: number,
            /**
             * Hold duration in ms.
             */
            hold?: number,
            /**
             * Transit-out duration in ms.
             */
            out?: number,
        },

        /**
         * Transit-in mode or callback.
         */
        transitIn?: 0 | 1 | 'popUp' | 'fadeIn' | TransitCallbackType,

        /**
         * Transit-out mode or callback.
         */
        transitOut?: 0 | 1 | 'scaleDown' | 'fadeOut' | TransitCallbackType,

        /**
         * True to destroy on close.
         */
        destroy?: boolean,

        /**
         * True to open on start.
         */
        openOnStart?: boolean,
    }
}

/**
 * Modal behavior with open/close transitions.
 */
declare class Modal extends OpenCloseTransition {
    /**
     * Create a Modal behavior.
     * @param gameObject - Target game object.
     * @param config - Modal configuration.
     */
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Modal.IConfig
    );

    /**
     * Request to close the modal.
     * @param closeEventData - Event data for closing.
     * @returns This instance.
     */
    requestClose(
        closeEventData?: unknown
    ): this;

    /**
     * Set cover transit-in callback.
     * @param callback - Transit callback.
     * @returns This instance.
     */
    setCoverTransitInCallback(callback?: Modal.TransitCallbackType): this;
    /**
     * Set cover transit-out callback.
     * @param callback - Transit callback.
     * @returns This instance.
     */
    setCoverTransitOutCallback(callback?: Modal.TransitCallbackType): this;
}
