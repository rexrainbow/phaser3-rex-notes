import TickTask from '../../utils/behaviorbase/TickTask';

export default MoveTo;

declare namespace MoveTo {

    interface IConfig {
        speed?: number,
        rotateToTarget?: boolean
    }
}

declare class MoveTo extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: MoveTo.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    moveTo(x: number, y: number): this;
    moveTo(config: {
        x: number,
        y: number,
        speed?: number
    }): this;

    setSpeed(speed: number): this;
    speed: number;

    setRotateToTarget(enable?: boolean): this;
    rotateToTarget: boolean;
}