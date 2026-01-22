import DynamicText from '../dynamictext/DynamicText';
import HiddenTextEdit from './textedit/HiddenTextEdit';

export default CanvasInput;

declare namespace CanvasInput {
    /**
     * Callback fired when a character is added.
     * @param child - Added character bob.
     * @param index - Character index.
     * @param canvasInput - Canvas input instance.
     */
    type AddCharCallbackType = (
        child: DynamicText.CharBob,
        index: number,
        canvasInput: CanvasInput
    ) => void;

    /**
     * Callback fired when cursor moves.
     * @param currCursorIndex - Current cursor index.
     * @param prevCursorIndex - Previous cursor index.
     * @param canvasInput - Canvas input instance.
     */
    type MoveCursorCallbackType = (
        currCursorIndex: number,
        prevCursorIndex: number,
        canvasInput: CanvasInput
    ) => void;

    /**
     * Callback to parse input text.
     * @param text - Raw input text.
     * @returns Parsed value.
     */
    type ParseTextCallbackType = (
        text: string
    ) => unknown;

    interface IConfigBackground extends DynamicText.IConfigBackground {
        /**
         * Focus background color.
         */
        'focus.color'?: string | number | null,
        /**
         * Focus background secondary color.
         */
        'focus.color2'?: string | number | null,
        /**
         * True for horizontal focus gradient.
         */
        'focus.horizontalGradient'?: boolean,

        /**
         * Focus stroke color.
         */
        'focus.stroke'?: string | number | null,
        /**
         * Focus stroke thickness.
         */
        'focus.strokeThickness'?: number,

        /**
         * Focus corner radius.
         */
        'focus.cornerRadius'?: DynamicText.RadiusType | DynamicText.IRadiusConfig,
        /**
         * Focus corner iteration.
         */
        'focus.cornerIteration'?: number
    }

    interface IConfigTextStyle extends DynamicText.IConfigTextStyle {
        /**
         * Cursor bold state.
         */
        'cursor.bold'?: boolean,
        /**
         * Cursor italic state.
         */
        'cursor.italic'?: boolean,
        /**
         * Cursor font size.
         */
        'cursor.fontSize'?: string | number,
        /**
         * Cursor font family.
         */
        'cursor.fontFamily'?: string,
        /**
         * Cursor color.
         */
        'cursor.color'?: string | number | null,
        /**
         * Cursor stroke color.
         */
        'cursor.stroke'?: string | number | null,
        /**
         * Cursor stroke thickness.
         */
        'cursor.strokeThickness'?: number,
        /**
         * Cursor shadow color.
         */
        'cursor.shadowColor'?: string | number | null,
        /**
         * Cursor shadow offset x.
         */
        'cursor.shadowOffsetX'?: number,
        /**
         * Cursor shadow offset y.
         */
        'cursor.shadowOffsetY'?: number,
        /**
         * Cursor shadow blur.
         */
        'cursor.shadowBlur'?: number,
        /**
         * Cursor background color.
         */
        'cursor.backgroundColor'?: string | number | null,
        /**
         * Cursor background height.
         */
        'cursor.backgroundHeight'?: number,
        /**
         * Cursor background bottom y.
         */
        'cursor.backgroundBottomY'?: number,
        /**
         * Cursor background left x.
         */
        'cursor.backgroundLeftX'?: number,
        /**
         * Cursor background right x.
         */
        'cursor.backgroundRightX'?: number,
        /**
         * Cursor offset x.
         */
        'cursor.offsetX'?: number,
        /**
         * Cursor offset y.
         */
        'cursor.offsetY'?: number,
        /**
         * Cursor left spacing.
         */
        'cursor.leftSpace'?: number,
        /**
         * Cursor right spacing.
         */
        'cursor.rightSpace'?: number,

        /**
         * Range bold state.
         */
        'range.bold'?: boolean,
        /**
         * Range italic state.
         */
        'range.italic'?: boolean,
        /**
         * Range font size.
         */
        'range.fontSize'?: string | number,
        /**
         * Range font family.
         */
        'range.fontFamily'?: string,
        /**
         * Range color.
         */
        'range.color'?: string | number | null,
        /**
         * Range stroke color.
         */
        'range.stroke'?: string | number | null,
        /**
         * Range stroke thickness.
         */
        'range.strokeThickness'?: number,
        /**
         * Range shadow color.
         */
        'range.shadowColor'?: string | number | null,
        /**
         * Range shadow offset x.
         */
        'range.shadowOffsetX'?: number,
        /**
         * Range shadow offset y.
         */
        'range.shadowOffsetY'?: number,
        /**
         * Range shadow blur.
         */
        'range.shadowBlur'?: number,
        /**
         * Range background color.
         */
        'range.backgroundColor'?: string | number | null,
        /**
         * Range background height.
         */
        'range.backgroundHeight'?: number,
        /**
         * Range background bottom y.
         */
        'range.backgroundBottomY'?: number,
        /**
         * Range background left x.
         */
        'range.backgroundLeftX'?: number,
        /**
         * Range background right x.
         */
        'range.backgroundRightX'?: number,
        /**
         * Range offset x.
         */
        'range.offsetX'?: number,
        /**
         * Range offset y.
         */
        'range.offsetY'?: number,
        /**
         * Range left spacing.
         */
        'range.leftSpace'?: number,
        /**
         * Range right spacing.
         */
        'range.rightSpace'?: number,
    }

    interface IConfig extends DynamicText.IConfig {
        /**
         * True to enable text area behavior.
         */
        textArea?: boolean;

        /**
         * Hidden text edit config.
         */
        edit?: HiddenTextEdit.IConfig;

        /**
         * Background config overrides.
         */
        background?: IConfigBackground,

        /**
         * Focus background style.
         */
        focusStyle?: DynamicText.IConfigBackground;

        /**
         * Text style config overrides.
         */
        style?: IConfigTextStyle

        /**
         * Cursor style overrides.
         */
        cursorStyle?: DynamicText.IConfigTextStyle;

        /**
         * Range selection style overrides.
         */
        rangeStyle?: DynamicText.IConfigTextStyle;

        /**
         * Open callback.
         */
        onOpen?: HiddenTextEdit.OnOpenCallbackType;
        /**
         * Focus callback.
         */
        onFocus?: HiddenTextEdit.OnOpenCallbackType;

        /**
         * Close callback.
         */
        onClose?: HiddenTextEdit.OnCloseCallbackType;
        /**
         * Blur callback.
         */
        onBlur?: HiddenTextEdit.OnCloseCallbackType;

        /**
         * Update callback.
         */
        onUpdate?: HiddenTextEdit.OnUpdateCallbackType;

        /**
         * Callback when a char is added.
         */
        onAddChar?: AddCharCallbackType;

        /**
         * Callback when cursor moves.
         */
        onMoveCursor?: MoveCursorCallbackType;

        /**
         * Parse text callback.
         */
        parseTextCallback?: ParseTextCallbackType;

        /**
         * True to make input read-only.
         */
        readOnly?: boolean,
        /**
         * Maximum input length.
         */
        maxLength?: number,
        /**
         * Minimum input length.
         */
        minLength?: number,
        /**
         * True to select all on focus.
         */
        selectAll?: boolean,

        /**
         * Click outside target.
         */
        clickOutSideTarget?: boolean | Phaser.GameObjects.GameObject,
    }
}

/**
 * Canvas-based text input with cursor and selection rendering.
 */
declare class CanvasInput extends DynamicText {
    /**
     * Create a canvas input.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param fixedWidth - Fixed width.
     * @param fixedHeight - Fixed height.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        fixedWidth?: number, fixedHeight?: number,
        config?: CanvasInput.IConfig
    );
    /**
     * Create a canvas input.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        config?: CanvasInput.IConfig
    );
    /**
     * Create a canvas input from config.
     * @param scene - The Scene to which this object belongs.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: CanvasInput.IConfig
    );

    /**
     * Set input text.
     * @param text - Text content.
     * @returns This instance.
     */
    setText(text: string): this;
    /**
     * Append input text.
     * @param text - Text content.
     * @returns This instance.
     */
    appendText(text: string): this;

    /**
     * Current display text.
     */
    displayText: string;
    /**
     * Set display text.
     * @param value - Display text.
     * @returns This instance.
     */
    setDisplayText(value: string): this;

    /**
     * Current input text.
     */
    inputText: string;
    /**
     * Set input text.
     * @param value - Input text.
     * @returns This instance.
     */
    setInputText(value: string): this;

    /**
     * Set parse text callback.
     * @param callback - Parse callback.
     * @returns This instance.
     */
    setParseTextCallback(callback?: CanvasInput.ParseTextCallbackType): this;
    /**
     * Get parsed value.
     * @returns Parsed value.
     */
    getValue(): unknown;
    /**
     * Set parsed value.
     * @param value - Parsed value.
     * @returns This instance.
     */
    setValue(value: unknown): this;
    /**
     * Current parsed value.
     */
    value: unknown;

    /**
     * Enable or disable read-only mode.
     * @param enable - True to enable.
     * @returns This instance.
     */
    setReadOnly(enable?: boolean): this;
    /**
     * Read-only flag.
     */
    readOnly: boolean;

    /**
     * Open the input.
     * @param onCloseCallback - Optional close callback.
     * @returns This instance.
     */
    open(onCloseCallback?: Function): this;
    /**
     * Close the input.
     * @returns This instance.
     */
    close(): this;
    /**
     * True if input is opened.
     */
    readonly isOpened: boolean;

    /**
     * Set focus background style.
     * @param style - Background style.
     * @returns This instance.
     */
    setFocusStyle(
        style: DynamicText.IConfigBackground
    ): this;

    /**
     * Set cursor text style.
     * @param style - Text style.
     * @returns This instance.
     */
    setCursorStyle(
        style: DynamicText.IConfigTextStyle
    ): this;

    /**
     * Set range selection style.
     * @param style - Text style.
     * @returns This instance.
     */
    setRangeStyle(
        style: DynamicText.IConfigTextStyle
    ): this;

    /**
     * Configure as number input.
     * @returns This instance.
     */
    setNumberInput(): this;

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
     * Content width.
     */
    readonly contentWidth: number;
    /**
     * Content height.
     */
    readonly contentHeight: number;
    /**
     * Line count.
     */
    readonly linesCount: number;

    /**
     * Top text offset Y.
     */
    readonly topTextOY: number;
    /**
     * Bottom text offset Y.
     */
    readonly bottomTextOY: number;
    /**
     * Left text offset X.
     */
    readonly leftTextOX: number;
    /**
     * Right text offset X.
     */
    readonly rightTextOX: number;

    /**
     * Set text offset Y by percentage.
     * @param t - Percentage value.
     * @returns This instance.
     */
    setTextOYByPercentage(t: number): this;
    /**
     * Get text offset Y percentage.
     * @returns Percentage value.
     */
    getTextOYPercentage(): number;
    /**
     * Current text offset Y percentage.
     */
    t: number;

    /**
     * Set text offset X by percentage.
     * @param s - Percentage value.
     * @returns This instance.
     */
    setTextOXByPercentage(s: number): this;
    /**
     * Get text offset X percentage.
     * @returns Percentage value.
     */
    getTextOXPercentage(): number;
    /**
     * Current text offset X percentage.
     */
    s: number;

    /**
     * Move cursor left.
     * @returns This instance.
     */
    cursorMoveLeft(): this;
    /**
     * Move cursor right.
     * @returns This instance.
     */
    cursorMoveRight(): this;
    /**
     * Move cursor up.
     * @returns This instance.
     */
    cursorMoveUp(): this;
    /**
     * Move cursor down.
     * @returns This instance.
     */
    cursorMoveDown(): this;

}
