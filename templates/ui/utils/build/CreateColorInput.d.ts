import ColorInput from '../../colorinput/colorinput/ColorInput.js';

declare function CreateColorInput(
    scene: Phaser.Scene,
    config?: ColorInput.IConfig,
    deepCloneConfig?: boolean,
): ColorInput;

export default CreateColorInput;