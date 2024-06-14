import Base from '../base/Base';

declare namespace AIO {
    type AnimationModeType = 'arrow' | 'audio' | 'ball' | 'bars' | 'box' | 'clock' |
        'cube' | 'dots' | 'facebook' | 'grid' | 'hearts' | 'ios' | 'oribit' | 'oval' |
        'pie' | 'puff' | 'radio' | 'rings' | 'spinner';

    type DirectionType = 0 | 'right' | 1 | 'down' | 2 | 'left' | 3 | 'up';

    interface IResetFromConfig extends Base.IResetFromConfig {
        direction?: DirectionType
    }

    interface IConfig extends Base.IConfig {
        animationMode?: AnimationModeType,
    }
}

declare class AIO extends Base {
    constructor(
        scene: Phaser.Scene,
        config?: AIO.IConfig
    )

    setAnimationMode(
        mode?: AIO.AnimationModeType,
        config?: AIO.IResetFromConfig
    ): this;

    setRandomAnimationMode(
        config?: AIO.IResetFromConfig
    ): this;

    animationMode: AIO.AnimationModeType;
}

export default AIO;