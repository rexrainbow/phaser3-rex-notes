// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default ToastQueue;

declare namespace ToastQueue {
    /**
     * Message payload type accepted by toast queue.
     */
    type MessageType = string | Object;

    /**
     * Callback used to create a message label object.
     */
    type CreateMessageLabelCallbackType = (
        /**
         * Scene that owns the created label.
         */
        scene: Phaser.Scene,
        /**
         * Message payload to display.
         */
        message: MessageType,
        /**
         * Toast queue instance.
         */
        toastQueue: ToastQueue
    ) => Phaser.GameObjects.GameObject;

    /**
     * Callback used to run toast transition animations.
     */
    type TransitionCallbackType = (
        /**
         * Target message label.
         */
        messageLabel: Phaser.GameObjects.GameObject,
        /**
         * Transition duration in milliseconds.
         */
        duration: number,
        /**
         * Toast queue instance.
         */
        toastQueue: ToastQueue
    ) => void;

    /**
     * Configuration options for creating a toast queue.
     */
    interface IConfig extends Sizer.IConfig {
        /**
         * Callback used to create message labels.
         */
        createMessageLabelCallback: CreateMessageLabelCallbackType,

        /**
         * Queue growth direction.
         */
        queueDirection?: 1 | 0 | 'bottom-to-top' | 'top-to-bottom' | 'right-to-left' | 'left-to-right',

        duration?: {
            /**
             * Transition-in duration.
             */
            in?: number,
            /**
             * Display duration.
             */
            hold?: number,
            /**
             * Transition-out duration.
             */
            out?: number,
        },

        /**
         * Transition-in callback.
         */
        transitIn?: TransitionCallbackType,

        /**
         * Transition-out callback.
         */
        transitOut?: TransitionCallbackType,
    }
}

/**
 * Queue-based toast message container.
 */
declare class ToastQueue extends Sizer {
    /**
     * Create a toast queue component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional toast queue configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ToastQueue.IConfig
    );

    /**
     * Show a message as a toast item.
     *
     * @param message - Message payload to display.
     * @returns This component instance.
     */
    showMessage(
        message: ToastQueue.MessageType
    ): this;

    /**
     * Remove a specific message label.
     *
     * @param messageLabel - Message label to remove.
     * @returns This component instance.
     */
    removeMessage(messageLabel: Phaser.GameObjects.GameObject): this;
    /**
     * Remove all queued message labels.
     *
     * @returns This component instance.
     */
    removeAllMessages(): this;

    /**
     * Current transition-in time in milliseconds.
     */
    transitInTime: number;
    /**
     * Set transition-in time.
     *
     * @param time - Duration in milliseconds.
     * @returns This component instance.
     */
    setTransitInTime(time: number): this;
    /**
     * Current display time in milliseconds.
     */
    displayTime: number;
    /**
     * Set display time.
     *
     * @param time - Duration in milliseconds.
     * @returns This component instance.
     */
    setDisplayTime(time: number): this;
    /**
     * Current transition-out time in milliseconds.
     */
    transitOutTime: number;
    /**
     * Set transition-out time.
     *
     * @param time - Duration in milliseconds.
     * @returns This component instance.
     */
    setTransitOutTime(time: number): this;

    /**
     * Set transition-in callback.
     *
     * @param callback - Transition callback.
     * @returns This component instance.
     */
    setTransitInCallback(
        callback: ToastQueue.TransitionCallbackType
    ): this;
    /**
     * Set transition-out callback.
     *
     * @param callback - Transition callback.
     * @returns This component instance.
     */
    setTransitOutCallback(
        callback: ToastQueue.TransitionCallbackType
    ): this;
}
