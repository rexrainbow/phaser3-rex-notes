export default MouseWheelScroller;

declare namespace MouseWheelScroller {
    interface IConfig {
        focus?: boolean,
        speed?: number,
        enable?: boolean
    }
}

declare class MouseWheelScroller extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: MouseWheelScroller.IConfig
    )

    setSpeed(speed: number): this;
    speed: number;

    setEnable(enable?: boolean): this;
    enable: boolean;
}