export default Sequence;

declare namespace Sequence {
    interface IConfig {
        yoyo?: boolean,
        repeat?: number,
        loop?: boolean,
    }
}

declare class Sequence extends Phaser.Events.EventEmitter {
    constructor(config?: Sequence.IConfig);

    load(
        commands: any[],
        actionScope: Object
    ): this;

    start(): this;

    cancel(): this;

    stop(): this;

    readonly state: number;
    readonly completed: boolean;

    setYoyo(yoyo?: boolean): this;
    yoyo: boolean;

    setRepeat(count: number): this;
    readonly repeat: number;

    setLoop(loop?: boolean): this;
    loop: boolean;
}