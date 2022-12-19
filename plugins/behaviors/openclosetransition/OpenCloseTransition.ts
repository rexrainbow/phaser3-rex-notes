import ComponentBase from '../../utils/componentbase/ComponentBase';

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

        oneShot?: boolean,
        destroy?: boolean,
    }
}

declare class Transition extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Transition.IConfig
    );

    requestOpen(duration?: number): this;
    open(duration?: number): this;
    onOpen(): void;

    requestClose(closeEventData: any, duration?: number): this;
    close(duration?: number): this;
    onClose(): void;
}