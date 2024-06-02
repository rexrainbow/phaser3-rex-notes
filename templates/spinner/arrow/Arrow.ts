import Base from '../base/Base';

declare namespace Arrow {
    type DirectionType = 0 | 'right' | 1 | 'down' | 2 | 'left' | 3 | 'up';
    interface IConfig extends Base.IConfig {
        direction?: DirectionType
    }
}

declare class Arrow extends Base {
    constructor(
        scene: Phaser.Scene,
        config?: Arrow.IConfig
    )

    setDirection(direction?: Arrow.DirectionType): this;
}

export default Arrow;