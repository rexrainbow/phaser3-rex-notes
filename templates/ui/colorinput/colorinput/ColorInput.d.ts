import ColorInputLite from '../colorinputlite/ColorInputLite';

export default ColorInput;

declare namespace ColorInput {
    interface IConfig extends ColorInputLite.IConfig {
    }
}

declare class ColorInput extends ColorInputLite {
    constructor(
        scene: Phaser.Scene,
        config?: ColorInput.IConfig
    );
}