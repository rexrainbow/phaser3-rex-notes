export default EaseValueTaskBase;

declare class EaseValueTaskBase extends Phaser.Events.EventEmitter {
    setDelay(time: number): this;
    delay: number;

    setDuration(time: number): this;
    duration: number;

    setEase(ease: string): this;
    ease: string;

    start(): this;
    stop(): this;
    restart(): this;

    pause(): this;
    resume(): this;
    complete(): this;
    readonly isRunning: boolean;
}