import ColorInputBase from '../colorinputbase/ColorInputBase';

export default ColorInput;

declare namespace ColorInput {
    interface IConfig extends ColorInputBase.IConfig {
    }
}

declare class ColorInput extends ColorInputBase {
    constructor(
        scene: Phaser.Scene,
        config?: ColorInput.IConfig
    );
}