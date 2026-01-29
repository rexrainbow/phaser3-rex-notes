import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import InputText from '../../inputtext';

export default TextEdit;

declare namespace TextEdit {
    /**
     * TextEdit open configuration.
     */
    interface IConfigOpen {
        /**
         * Input element type.
         */
        type?: string,
        /**
         * Input element inputType.
         */
        inputType?: string,
        /**
         * True to close on Enter key.
         */
        enterClose?: boolean,
        /**
         * True to select all text on open.
         */
        selectAll?: boolean,

        /**
         * Callback on input creation.
         */
        onCreate?: (
            textObject: Phaser.GameObjects.GameObject,
            inputText: InputText
        ) => void,

        /**
         * Callback on open.
         */
        onOpen?: (
            textObject: Phaser.GameObjects.GameObject,
            inputText: InputText
        ) => void,

        /**
         * Callback on text change.
         */
        onTextChanged?: (textObject: Phaser.GameObjects.GameObject, text: string) => void,
        /**
         * Callback on close.
         */
        onClose?: (textObject: Phaser.GameObjects.GameObject) => void,

        /**
         * Initial text.
         */
        text?: string,
        /**
         * Font family name.
         */
        fontFamily?: string,
        /**
         * Font size value.
         */
        fontSize?: string,
        /**
         * Text color.
         */
        color?: string,
        /**
         * Text alignment.
         */
        align?: string,
        /**
         * Additional style map.
         */
        style?: { [name: string]: any },
    }

    /**
     * TextEdit configuration.
     */
    interface IConfig extends IConfigOpen {
        /**
         * True to enable click-to-open.
         */
        clickEnable?: boolean;
    }
}

/**
 * Text edit behavior for a game object.
 */
declare class TextEdit extends ComponentBase {
    /**
     * Create a TextEdit behavior.
     * @param textObject - Target game object.
     */
    constructor(
        textObject: Phaser.GameObjects.GameObject
    );

    /**
     * Open the text editor.
     * @param config - Text edit configuration.
     * @param onCloseCallback - Callback on close.
     * @returns This instance.
     */
    open(
        config?: TextEdit.IConfigOpen,
        onCloseCallback?: (textObject: Phaser.GameObjects.GameObject) => void
    ): this;

    /**
     * Close the text editor.
     * @returns This instance.
     */
    close(): this;

    /**
     * True if opened.
     */
    readonly isOpened: boolean;
    /**
     * Current text value.
     */
    readonly text: string;

    /**
     * InputText instance.
     */
    readonly inputText: InputText;
}
