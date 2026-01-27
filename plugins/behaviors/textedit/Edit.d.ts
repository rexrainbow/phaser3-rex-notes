import TextEdit from './TextEdit';

/**
 * Create and open a text editor for a game object.
 * @param textObject - Target game object.
 * @param config - Text edit configuration.
 * @param onCloseCallback - Callback on close.
 * @returns TextEdit instance.
 */
export default function Edit(
    textObject: Phaser.GameObjects.GameObject,
    config?: TextEdit.IConfigOpen,
    onCloseCallback?: (textObject: Phaser.GameObjects.GameObject) => void
): TextEdit;
