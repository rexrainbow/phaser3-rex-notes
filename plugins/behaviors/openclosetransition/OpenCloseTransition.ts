import ComponentBase from '../../utils/componentbase/ComponentBase';

export default OpenCloseTransition;

declare namespace OpenCloseTransition {
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
        opened?: boolean,
    }
}

declare class OpenCloseTransition extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: OpenCloseTransition.IConfig
    );

    setTransitInTime(duration: number): this;
    transitInTime: number;

    setTransitOutTime(duration: number): this;
    transitOutTime: number;

    setTransitInCallback(
        callback?: OpenCloseTransition.TransitCallbackType
    ): this;
    transitInCallback: OpenCloseTransition.TransitCallbackType;

    setTransitOutCallback(
        callback?: OpenCloseTransition.TransitCallbackType
    ): this;
    transitOutCallback: OpenCloseTransition.TransitCallbackType;

    requestOpen(duration?: number): this;
    open(duration?: number): this;
    onOpen(): void;

    requestClose(closeEventData: any, duration?: number): this;
    close(duration?: number): this;
    onClose(): void;
}