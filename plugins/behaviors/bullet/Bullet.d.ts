import TickTask from '../../utils/componentbase/TickTask';

export default Bullet;

declare namespace Bullet {

    interface IConfig {
        speed?: number,
        enable?: boolean
    }
}

declare class Bullet extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Bullet.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    setSpeed(speed: number): this;
    speed: number;
}