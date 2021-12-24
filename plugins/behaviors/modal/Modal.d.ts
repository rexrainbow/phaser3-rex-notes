export default Modal;

declare namespace Modal {
    interface IConfig {
        cover?: {
            color?: number,
            alpha?: number,
        },

        manualClose?: boolean,

        anyTouchClose?: boolean,

        duration?: {
            in?: number,
            hold?: number,
            out?: number,
        },

        transitIn?: 0 | 1 | 'popUp' | 'fadeIn' |
        ((gameObject: Phaser.GameObjects.GameObject, duration: number) => void),

        transitOut?: 0 | 1 | 'scaleDown' | 'fadeOut' |
        ((gameObject: Phaser.GameObjects.GameObject, duration: number) => void),

        destroy?: boolean,
    }
}

declare class Modal extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Modal.IConfig
    );

    requestClose(
        closeEventData?: unknown
    ): this;
}