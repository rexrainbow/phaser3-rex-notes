export default InTouching;

declare namespace InTouching {

    interface IConfig {
        enable?: boolean,
        cooldown?: number,
    }
}

declare class InTouching extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: InTouching.IConfig
    )

    isInTouching: boolean;

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setCooldown(time: number): this;
    cooldownTime: number;
}
