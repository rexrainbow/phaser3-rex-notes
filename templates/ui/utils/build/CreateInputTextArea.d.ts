import TextAreaInput from '../../textareainput/TextAreaInput.js';

/**
 * Create a `TextAreaInput` from configuration.
 *
 * @param scene - Scene that owns the created input.
 * @param config - Optional text area input configuration.
 * @param deepCloneConfig - Set to true to deep-clone config before use.
 * @returns Created text area input instance.
 */
declare function CreateInputTextArea(
    scene: Phaser.Scene,
    config?: TextAreaInput.IConfig,
    deepCloneConfig?: boolean
): TextAreaInput;

export default CreateInputTextArea;
