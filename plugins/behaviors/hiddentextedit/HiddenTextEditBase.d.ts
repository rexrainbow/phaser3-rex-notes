import ComponentBase from '../../utils/componentbase/ComponentBase';

export default HiddenTextEditBase;

declare namespace HiddenTextEditBase {
    /**
     * Callback fired when the hidden input is opened.
     * @param textObject - Target game object.
     * @param hiddenInputText - Hidden text edit instance.
     */
    type OnOpenCallbackType = (
        textObject: Phaser.GameObjects.GameObject,
        hiddenInputText: HiddenTextEditBase,
    ) => void;

    /**
     * Callback fired when the hidden input is closed.
     * @param textObject - Target game object.
     * @param hiddenInputText - Hidden text edit instance.
     */
    type OnCloseCallbackType = (
        textObject: Phaser.GameObjects.GameObject,
        hiddenInputText: HiddenTextEditBase,
    ) => void;

    /**
     * Callback fired when the text is updated.
     * @param text - Current text.
     * @param textObject - Target game object.
     * @param hiddenInputText - Hidden text edit instance.
     * @returns Optional new text.
     */
    type OnUpdateCallbackType = (
        text: string,
        textObject: Phaser.GameObjects.GameObject,
        hiddenInputText: HiddenTextEditBase,
    ) => void | string;


    interface IConfig {
        /**
         * True to close on Enter key.
         */
        enterClose?: boolean;

        /**
         * Open callback.
         */
        onOpen: OnOpenCallbackType;

        /**
         * Close callback.
         */
        onClose: OnCloseCallbackType;

        /**
         * Update callback or 'number' for numeric mode.
         */
        onUpdate: OnUpdateCallbackType | 'number';

        // Copy from InputText
        /**
         * Input element type.
         */
        type?: string,
        /**
         * Input element inputType.
         */
        inputType?: string,

        // Element properties
        /**
         * Element id.
         */
        id?: string,
        /**
         * Initial text value.
         */
        text?: string,
        /**
         * Max length.
         */
        maxLength?: number,
        /**
         * Min length.
         */
        minLength?: number,
        /**
         * Placeholder text.
         */
        placeholder?: string,
        /**
         * Tooltip text.
         */
        tooltip?: string,
        /**
         * True to set read-only.
         */
        readOnly?: boolean,
        /**
         * True to enable spell check.
         */
        spellCheck?: boolean,
        /**
         * Autocomplete mode.
         */
        autoComplete?: 'on' | 'off',

        // Style properties
        /**
         * Text alignment.
         */
        align?: string,
        /**
         * Left padding.
         */
        paddingLeft?: string,
        /**
         * Right padding.
         */
        paddingRight?: string,
        /**
         * Top padding.
         */
        paddingTop?: string,
        /**
         * Bottom padding.
         */
        paddingBottom?: string,
        /**
         * Font family.
         */
        fontFamily?: string,
        /**
         * Font size.
         */
        fontSize?: string,
        /**
         * Text color.
         */
        color?: string,
        /**
         * Border width.
         */
        border?: number,
        /**
         * Background color.
         */
        backgroundColor?: string,
        /**
         * Border color.
         */
        borderColor?: string,
        /**
         * Outline style.
         */
        outline?: string,

        /**
         * True to select all text on open.
         */
        selectAll?: boolean,
    }

    /**
     * Callback used to update text programmatically.
     * @param newText - New text value.
     * @param hiddenInputText - Hidden text edit instance.
     * @returns Updated text.
     */
    type UpdateTextCallbackType = (
        newText: string,
        hiddenInputText: HiddenTextEditBase,
    ) => string;
}

/**
 * Hidden text input behavior attached to a game object.
 */
declare class HiddenTextEditBase extends ComponentBase {
    /**
     * Create a hidden text edit behavior.
     * @param textObject - Target game object.
     * @param config - Configuration options.
     */
    constructor(
        textObject: Phaser.GameObjects.GameObject,
        config?: HiddenTextEditBase.IConfig
    );

    /**
     * Enable or disable Enter-to-close behavior.
     * @param value - True to enable.
     * @returns This instance.
     */
    setEnterClose(
        value?: boolean
    ): this;

    /**
     * Open the hidden input.
     * @returns This instance.
     */
    open(): this;
    /**
     * Close the hidden input.
     * @returns This instance.
     */
    close(): this;
    /**
     * True if the hidden input is opened.
     */
    readonly isOpened: boolean;

    // Copy from InputText
    /**
     * Set input text.
     * @param text - Text value.
     * @returns This instance.
     */
    setText(text: string): this;
    /**
     * Current text value.
     */
    text: string;

    /**
     * Select a text range.
     * @param selectionStart - Start index.
     * @param selectionEnd - End index.
     * @returns This instance.
     */
    selectText(
        selectionStart?: number,
        selectionEnd?: number
    ): this;
    /**
     * Select all text.
     * @returns This instance.
     */
    selectAll(): this;
    /**
     * Selection start index.
     */
    readonly selectionStart: number;
    /**
     * Selection end index.
     */
    readonly selectionEnd: number;
    /**
     * Selected text string.
     */
    readonly selectedText: string;

    /**
     * Set cursor position.
     * @param value - Cursor index.
     * @returns This instance.
     */
    setCursorPosition(value: number): this;
    /**
     * Cursor position.
     */
    cursorPosition: number;

    /**
     * Scroll to the bottom.
     * @returns This instance.
     */
    scrollToBottom(): this;

    /**
     * Get a style value.
     * @param key - Style key.
     * @returns Style value.
     */
    getStyle(key: string): string;

    /**
     * Set a style value.
     * @param key - Style key.
     * @param value - Style value.
     * @returns This instance.
     */
    setStyle(key: string, value?: number | string): this;

    /**
     * Focus the hidden input.
     * @returns This instance.
     */
    setFocus(): this;
    /**
     * Blur the hidden input.
     * @returns This instance.
     */
    setBlur(): this;
    /**
     * True if the hidden input is focused.
     */
    readonly isFocused: boolean;

    /**
     * Set font color.
     * @param color - Color value.
     * @returns This instance.
     */
    setFontColor(color: string): this;
    /**
     * Font color.
     */
    fontColor: string;

    /**
     * Set maximum length.
     * @param value - Max length.
     * @returns This instance.
     */
    setMaxLength(value: number): this;
    /**
     * Maximum length.
     */
    maxLength: number;

    /**
     * Set minimum length.
     * @param value - Min length.
     * @returns This instance.
     */
    setMinLength(value: number): this;
    /**
     * Minimum length.
     */
    minLength: number;

    /**
     * Set placeholder text.
     * @param value - Placeholder text.
     * @returns This instance.
     */
    setPlaceholder(value: string): this;
    /**
     * Placeholder text.
     */
    placeholder: string;

    /**
     * Set tooltip text.
     * @param value - Tooltip text.
     * @returns This instance.
     */
    setTooltip(value: string): this;
    /**
     * Tooltip text.
     */
    tooltip: string;
}
