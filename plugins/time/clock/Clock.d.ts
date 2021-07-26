export default Clock;

declare namespace Clock {
    interface IConfig {
        timeScale?: number
    }
}

declare class Clock extends Phaser.Events.EventEmitter {
    constructor(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
        config?: Clock.IConfig
    );

    start(startAt?: number): this;
    seek(time?: number): this;
    pause(): this;
    resume(): this;
    stop(): this;

    readonly now: number;
    readonly isRunning: boolean;

    setTimeScale(timeScale: number): this;
    timeScale: number;

}