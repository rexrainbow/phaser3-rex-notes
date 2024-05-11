// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default ToastQueue;

declare namespace ToastQueue {
    type MessageType = string | Object;

    type CreateMessageLabelCallbackType = (
        scene: Phaser.Scene,
        message: MessageType,
        toastQueue: ToastQueue,
    ) => Phaser.GameObjects.GameObject;

    type TransitionCallbackType = (
        messageLabel: Phaser.GameObjects.GameObject,
        duration: number,
        toastQueue: ToastQueue
    ) => void;

    interface IConfig extends Sizer.IConfig {
        createMessageLabelCallback: CreateMessageLabelCallbackType,

        queueDirection?: 1 | 0 | 'bottom-to-top' | 'top-to-bottom' | 'right-to-left' | 'left-to-right',

        duration?: {
            in?: number,
            hold?: number,
            out?: number,
        },

        transitIn?: TransitionCallbackType,

        transitOut?: TransitionCallbackType,
    }
}

declare class ToastQueue extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: ToastQueue.IConfig
    );

    showMessage(
        message: ToastQueue.MessageType
    ): this;

    removeMessage(messageLabel: Phaser.GameObjects.GameObject): this;
    removeAllMessages(): this;

    transitInTime: number;
    setTransitInTime(time: number): this;
    displayTime: number;
    setDisplayTime(time: number): this;
    transitOutTime: number;
    setTransitOutTime(time: number): this;

    setTransitInCallback(
        callback: ToastQueue.TransitionCallbackType
    ): this;
    setTransitOutCallback(
        callback: ToastQueue.TransitionCallbackType
    ): this;
}