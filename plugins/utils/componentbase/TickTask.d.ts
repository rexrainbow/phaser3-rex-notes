
export default class TickTask extends Phaser.Events.EventEmitter {
    start(): this;
    pause(): this;
    resume(): this;
    stop(): this;
    complete(): this;
    isRunning: boolean;
    isPaused: boolean;
}