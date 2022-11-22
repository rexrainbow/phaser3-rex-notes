export default TouchEventStop;

declare namespace TouchEventStop {
    type HitAreaMode = 0 | 1 | 'default' | 'fullWindow';

    interface IConfig {
        hitAreaMode?: HitAreaMode,
        enable?: boolean,
        stopAllLevels?: boolean,
    }
}

declare class TouchEventStop extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: TouchEventStop.IConfig
    )

    setHitAreaMode(
        mode?: TouchEventStop.HitAreaMode
    ): this;

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setStopMode(stopAllLevels?: boolean): this;
}
