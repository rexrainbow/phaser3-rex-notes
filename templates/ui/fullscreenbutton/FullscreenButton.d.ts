import Click from '../click/Click';

export default FullscreenButton;

declare namespace FullscreenButton {
    type CallbackTypes = string |
    { key?: string, frame?: string } |
        ((gameObject: Phaser.GameObjects.GameObject) => void);

    interface IConfig extends Click.IConfig {
        onEnter?: CallbackTypes,
        onLeave?: CallbackTypes
    }
}

declare class FullscreenButton extends Click {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: FullscreenButton.IConfig
    )
}