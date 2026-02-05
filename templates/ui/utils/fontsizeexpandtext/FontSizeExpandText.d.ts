/**
 * Configuration for resizing text by adjusting font size.
 */
interface FontSizeExpandTextConfig {
    /** Minimum target width for the text object. */
    minWidth?: number,
    /** Minimum target height for the text object. */
    minHeight?: number,
    /** Set to true to fit the text height as well as width. */
    fitHeight?: boolean,
}

/**
 * Resize text by adjusting font size with a minimum width target.
 *
 * @param textObject - The text-like game object to resize.
 * @param minWidth - The minimum target width.
 * @returns The same game object after applying font size expansion behavior.
 */
export default function (
    textObject: Phaser.GameObjects.GameObject,
    minWidth?: number
): Phaser.GameObjects.GameObject;

/**
 * Resize text by adjusting font size with detailed constraints.
 *
 * @param textObject - The text-like game object to resize.
 * @param config - Configuration that controls minimum size and fit behavior.
 * @returns The same game object after applying font size expansion behavior.
 */
export default function (
    textObject: Phaser.GameObjects.GameObject,
    config?: FontSizeExpandTextConfig
): Phaser.GameObjects.GameObject;
