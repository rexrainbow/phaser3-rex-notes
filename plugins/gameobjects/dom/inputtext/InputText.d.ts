export default InputText;

declare namespace InputText {
    /**
     * Configuration options for creating a DOM input text object.
     */
    interface IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,

        /**
         * DOM element type.
         */
        type?: string,
        /**
         * Input type attribute.
         */
        inputType?: string,

        // Element properties
        /**
         * DOM element id.
         */
        id?: string,
        /**
         * Initial text value.
         */
        text?: string,
        /**
         * Maximum text length.
         */
        maxLength?: number,
        /**
         * Minimum text length.
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
         * Set to true to make input read-only.
         */
        readOnly?: boolean,
        /**
         * Set to true to enable spell check.
         */
        spellCheck?: boolean,
        /**
         * Auto-complete attribute value.
         */
        autoComplete?: string,
        /**
         * Auto-capitalize attribute value.
         */
        autoCapitalize?: string,

        // Style properties
        /**
         * Text align style.
         */
        align?: string,
        /**
         * Left padding style.
         */
        paddingLeft?: string,
        /**
         * Right padding style.
         */
        paddingRight?: string,
        /**
         * Top padding style.
         */
        paddingTop?: string,
        /**
         * Bottom padding style.
         */
        paddingBottom?: string,
        /**
         * Font family style.
         */
        fontFamily?: string,
        /**
         * Font size style.
         */
        fontSize?: string,
        /**
         * Font color style.
         */
        color?: string,
        /**
         * Border width style.
         */
        border?: number,
        /**
         * Background color style.
         */
        backgroundColor?: string,
        /**
         * Border color style.
         */
        borderColor?: string,
        /**
         * Border radius style.
         */
        borderRadius?: string,
        /**
         * Outline style.
         */
        outline?: string,

        /**
         * Set to true to select all text after focus.
         */
        selectAll?: boolean,
    }

    /**
     * Event callback types emitted by input text object.
     */
    namespace Events {
        /**
         * Callback fired when text value changes.
         */
        type TextChangeCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired when input gains focus.
         */
        type FocusCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired when input loses focus.
         */
        type BlurCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired on click.
         */
        type ClickCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired on double click.
         */
        type DoubleClickCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired on select event.
         */
        type SelectCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired on pointer down.
         */
        type PointerDownCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired on pointer move.
         */
        type PointerMoveCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired on pointer up.
         */
        type PointerUpCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired on key down.
         */
        type KeyDownCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired on key press.
         */
        type KeyPressCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
        /**
         * Callback fired on key up.
         */
        type KeyUpCallbackType = (
            /**
             * Input text instance.
             */
            inputText: InputText,
            /**
             * Native event object.
             */
            e: Event
        ) => void;
    }
}

/**
 * DOM element wrapper for text input fields.
 */
declare class InputText extends Phaser.GameObjects.DOMElement {
    /**
     * Create an input text object with explicit bounds.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param width - Initial width.
     * @param height - Initial height.
     * @param config - Optional input configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        config?: InputText.IConfig
    );

    /**
     * Create an input text object with position and config.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param config - Optional input configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        config?: InputText.IConfig
    );

    /**
     * Create an input text object with config only.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional input configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: InputText.IConfig
    );

    /**
     * Current input type attribute.
     */
    readonly inputType: string;

    /**
     * Set text value.
     *
     * @param text - Text to assign.
     * @returns This input text instance.
     */
    setText(text: string): this;
    /**
     * Current text value.
     */
    text: string;

    /**
     * Select text range.
     *
     * @param selectionStart - Start index.
     * @param selectionEnd - End index.
     * @returns This input text instance.
     */
    selectText(
        selectionStart?: number,
        selectionEnd?: number
    ): this;
    /**
     * Select all text.
     *
     * @returns This input text instance.
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
     * Currently selected text.
     */
    readonly selectedText: string;

    /**
     * Set cursor position.
     *
     * @param value - Cursor index.
     * @returns This input text instance.
     */
    setCursorPosition(value: number): this;
    /**
     * Current cursor position.
     */
    cursorPosition: number;

    /**
     * Scroll input to bottom.
     *
     * @returns This input text instance.
     */
    scrollToBottom(): this;

    /**
     * Get computed style value by key.
     *
     * @param key - Style property name.
     * @returns Style value.
     */
    getStyle(key: string): string;

    /**
     * Set style value by key.
     *
     * @param key - Style property name.
     * @param value - Style property value.
     * @returns This input text instance.
     */
    setStyle(
        key: string,
        value?: number | string
    ): this;

    /**
     * Focus input element.
     *
     * @returns This input text instance.
     */
    setFocus(): this;
    /**
     * Blur input element.
     *
     * @returns This input text instance.
     */
    setBlur(): this;
    /**
     * True when input element is focused.
     */
    readonly isFocused: boolean;

    /**
     * Set font color.
     *
     * @param color - CSS color value.
     * @returns This input text instance.
     */
    setFontColor(color: string): this;
    /**
     * Current font color.
     */
    fontColor: string;

    /**
     * Set maximum text length.
     *
     * @param value - Maximum length.
     * @returns This input text instance.
     */
    setMaxLength(value: number): this;
    /**
     * Current maximum length.
     */
    maxLength: number;

    /**
     * Set minimum text length.
     *
     * @param value - Minimum length.
     * @returns This input text instance.
     */
    setMinLength(value: number): this;
    /**
     * Current minimum length.
     */
    minLength: number;

    /**
     * Set placeholder text.
     *
     * @param value - Placeholder string.
     * @returns This input text instance.
     */
    setPlaceholder(value: string): this;
    /**
     * Current placeholder text.
     */
    placeholder: string;

    /**
     * Set tooltip text.
     *
     * @param value - Tooltip string.
     * @returns This input text instance.
     */
    setTooltip(value: string): this;
    /**
     * Current tooltip text.
     */
    tooltip: string;

    /**
     * Resize DOM input element.
     *
     * @param width - New width.
     * @param height - New height.
     * @returns This input text instance.
     */
    resize(
        width: number,
        height: number
    ): this;
}
