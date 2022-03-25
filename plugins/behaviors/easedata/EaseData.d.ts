export default EaseData;

declare namespace EaseData {
    interface IConfig {
    }
}


declare class EaseData extends Phaser.Events.EventEmitter {
    easeTo(
        key: string,
        value: number,
        duration?: number,
        ease?: string
    ): this;

    easeTo(
        config: {
            key: string,
            value: number,
            duration?: number,
            ease?: string
        }
    ): this;

    easeFrom(
        key: string,
        value: number,
        duration?: number,
        ease?: string
    ): this;

    easeFrom(
        config: {
            key: string,
            value: number,
            duration?: number,
            ease?: string
        }
    ): this;

    stopEase(
        key: string,
        toEnd?: boolean
    ): this;

    stopAlll(
        toEnd?: boolean
    ): this;
}