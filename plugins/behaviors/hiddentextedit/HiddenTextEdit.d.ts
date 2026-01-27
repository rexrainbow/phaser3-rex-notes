import HiddenTextEditBase from './HiddenTextEditBase';

export default HiddenTextEdit;

declare namespace HiddenTextEdit {
    /**
     * HiddenTextEdit configuration.
     */
    interface IConfig extends HiddenTextEditBase.IConfig {
        /**
         * Cursor string.
         */
        cursor?: string;
        /**
         * Cursor flash duration in ms.
         */
        cursorFlashDuration?: number;
    }

    /**
     * Callback used to update text programmatically.
     */
    type UpdateTextCallbackType = (
        /**
         * New text value.
         */
        newText: string,
        /**
         * Hidden text edit instance.
         */
        hiddenInputText: HiddenTextEdit,
    ) => string;
}

/**
 * Hidden text input behavior with cursor rendering.
 */
declare class HiddenTextEdit extends HiddenTextEditBase {
    /**
     * Create a hidden text edit behavior.
     * @param textObject - Target game object.
     * @param config - Configuration options.
     */
    constructor(
        textObject: Phaser.GameObjects.GameObject,
        config?: HiddenTextEdit.IConfig
    );

    /**
     * Set cursor string.
     * @param s - Cursor string.
     * @returns This instance.
     */
    setCursor(
        s: string
    ): this;
    /**
     * Cursor string.
     */
    readonly cursor: string;

    /**
     * Set cursor flash duration.
     * @param duration - Duration in ms.
     * @returns This instance.
     */
    setCursorFlashDuration(
        duration: number
    ): this;
}
