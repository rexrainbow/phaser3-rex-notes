import TextAreaInput from '../../textareainput/TextAreaInput.js';

declare function CreateInputTextArea(
    scene: Phaser.Scene,
    config?: TextAreaInput.IConfig,
    deepCloneConfig?: boolean,
): TextAreaInput;

export default CreateInputTextArea;