export default TouchState;

declare namespace TouchState {

    interface IConfig {
        enable?: boolean,
    }
}

declare class TouchState extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TouchState.IConfig
    )

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;
}
