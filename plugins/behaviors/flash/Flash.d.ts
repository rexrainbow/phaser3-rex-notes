import TickTask from '../../utils/behaviorbase/TickTask';

export default Flash;

declare namespace Flash {

    interface IConfig {
        duration?: number,
        repeat?: number,
    }
}

declare class Flash extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Flash.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    flash(duration?: number, repeat?: number): this;
    flash(config: {
        duration?: number,
        repeat?: number,
    }): this;

    setDuration(duration: number): this;
    duration: number;

    setRepeat(repeat: number): this;
    repeat: number;
}