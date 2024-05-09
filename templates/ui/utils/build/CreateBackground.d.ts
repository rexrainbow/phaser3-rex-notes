import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle';

export default CreateBackground;

declare namespace CreateBackground {
    interface IConfig extends StatesRoundRectangle.IConfig {
        alpha?: number,
        tint?: number,
        flipX?: boolean, flipY?: boolean,
        origin?: number, originX?: number, originY?: number,
    }
}

declare function CreateBackground(
    scene: Phaser.Scene,
    config?: CreateBackground.IConfig
): StatesRoundRectangle