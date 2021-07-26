export default BaseClock;

declare namespace BaseClock {
    interface IConfig {
        timeScale?: number
    }
}

declare class BaseClock extends Phaser.Events.EventEmitter {
    constructor(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject,
        config?: BaseClock.IConfig
    );

    start(startAt?: number): this;
    seek(time?: number): this;
    pause(): this;
    resume(): this;
    stop(): this;
    tick(delta: number): this;

    readonly now: number;
    readonly isRunning: boolean;

    setTimeScale(timeScale: number): this;
    timeScale: number;

}