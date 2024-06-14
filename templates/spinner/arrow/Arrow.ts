import Base from '../base/Base';

declare namespace Arrow {
    type DirectionType = 0 | 'right' | 1 | 'down' | 2 | 'left' | 3 | 'up';

    interface IResetFromConfig extends Base.IResetFromConfig {
        direction?: DirectionType
    }

    interface IConfig extends Base.IConfig, IResetFromConfig {
    }
}

declare class Arrow extends Base {
    constructor(
        scene: Phaser.Scene,
        config?: Arrow.IConfig
    )

    setDirection(direction?: Arrow.DirectionType): this;

    resetFromConfig(
        config?: Arrow.IResetFromConfig,
        setDefaults?: boolean
    ): this;

}

export default Arrow;