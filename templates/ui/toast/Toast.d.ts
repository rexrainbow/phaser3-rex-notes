// import * as Phaser from 'phaser';
import Label from '../label/Label';


export default Toast;

declare namespace Toast {

    interface IConfig extends Label.IConfig {
        /**
         * Duration configuration.
         */
        duration?: {
            /**
             * Transit-in duration in ms.
             */
            in?: number,
            /**
             * Display duration in ms.
             */
            hold?: number,
            /**
             * Transit-out duration in ms.
             */
            out?: number,
        },

        /**
         * Transit-in mode or custom callback.
         */
        transitIn?: 0 | 1 | 'popUp' | 'fadeIn' |
        ((toast: Toast, duration: number) => void),

        /**
         * Transit-out mode or custom callback.
         */
        transitOut?: 0 | 1 | 'scaleDown' | 'fadeOut' |
        ((toast: Toast, duration: number) => void),
    }
}

/**
 * Toast notification label with queued messages and transitions.
 * @remarks Uses timed transit-in, hold, and transit-out animations.
 */
declare class Toast extends Label {
    /**
     * Create a toast.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Toast.IConfig
    );

    /**
     * Show a message string.
     * @param message - Message text.
     * @returns This instance.
     */
    showMessage(
        message: string
    ): this;
    /**
     * Show a message using a callback.
     * @param message - Callback invoked to configure the toast.
     * @returns This instance.
     */
    showMessage(
        message: (toast: Toast) => void
    ): this;
    /**
     * True if a message is currently playing.
     */
    readonly isShowingMessage: boolean;

    /**
     * Remove all queued messages.
     * @returns This instance.
     */
    removeAllMessages(): this;

    /**
     * Transit-in duration in ms.
     */
    transitInTime: number;
    /**
     * Set transit-in duration.
     * @param time - Duration in ms.
     * @returns This instance.
     */
    setTransitInTime(time: number): this;
    /**
     * Display duration in ms.
     */
    displayTime: number;
    /**
     * Set display duration.
     * @param time - Duration in ms.
     * @returns This instance.
     */
    setDisplayTime(time: number): this;
    /**
     * Transit-out duration in ms.
     */
    transitOutTime: number;
    /**
     * Set transit-out duration.
     * @param time - Duration in ms.
     * @returns This instance.
     */
    setTransitOutTime(time: number): this;

    /**
     * Set transit-in callback or mode.
     * @param callback - Mode or custom callback.
     * @returns This instance.
     */
    setTransitInCallback(
        callback: 0 | 1 | 'popUp' | 'fadeIn' |
            ((toast: Toast, duration: number) => void)
    ): this;
    /**
     * Set transit-out callback or mode.
     * @param callback - Mode or custom callback.
     * @returns This instance.
     */
    setTransitOutCallback(
        callback: 0 | 1 | 'scaleDown' | 'fadeOut' |
            ((toast: Toast, duration: number) => void)
    ): this;
}
