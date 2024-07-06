import CanvasInput from '../../canvasinput/CanvasInput.js';

declare function CreateInputText(
    scene: Phaser.Scene,
    config?: CanvasInput.IConfig,
    deepCloneConfig?: boolean,
): CanvasInput;

export default CreateInputText;