import ColorInput from '../../colorinput/colorinput/ColorInput.js';

/**
 * Create a color input game object with optional configuration cloning.
 *
 * @param scene - The Phaser scene that owns the created color input object.
 * @param config - Optional configuration for the color input object.
 * @param deepCloneConfig - Set to true to deep-clone the configuration before use.
 * @returns The created color input game object.
 */
declare function CreateColorInput(
    scene: Phaser.Scene,
    config?: ColorInput.IConfig,
    deepCloneConfig?: boolean,
): ColorInput;

export default CreateColorInput;
