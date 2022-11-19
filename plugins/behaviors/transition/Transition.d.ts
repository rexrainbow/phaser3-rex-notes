export default Transition;

declare namespace Transition {
    type TransitCallbackType = (
        gameObject: Phaser.GameObjects.GameObject,
        duration: number
    ) => void;

    interface IConfig {

        duration?: {
            in?: number,
            out?: number,
        },

        transitIn?: TransitCallbackType,

        transitOut?: TransitCallbackType,

        destroy?: boolean,
    }
}

declare class Transition extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Transition.IConfig
    );

    requestClose(closeEventData: any): this;
}