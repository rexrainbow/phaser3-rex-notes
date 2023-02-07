import RoundRectangle from '../../roundrectangle/RoundRectangle';

export default CreateBackground;

declare namespace CreateBackground {
    interface IConfig extends RoundRectangle.IConfig {

    }
}

declare function CreateBackground(
    scene: Phaser.Scene,
    config?: CreateBackground.IConfig
): RoundRectangle