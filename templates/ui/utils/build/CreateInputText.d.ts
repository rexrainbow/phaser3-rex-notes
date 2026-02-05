import CanvasInput from '../../canvasinput/CanvasInput.js';

/**
 * Create a `CanvasInput` from configuration.
 *
 * @param scene - Scene that owns the created input.
 * @param config - Optional canvas input configuration.
 * @param deepCloneConfig - Set to true to deep-clone config before use.
 * @returns Created canvas input instance.
 */
declare function CreateInputText(
    scene: Phaser.Scene,
    config?: CanvasInput.IConfig,
    deepCloneConfig?: boolean
): CanvasInput;

export default CreateInputText;
