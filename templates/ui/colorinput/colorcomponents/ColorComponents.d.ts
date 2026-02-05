import Sizer from '../../sizer/Sizer';
import RoundRectangle from '../../roundrectangle/RoundRectangle';
import Label from '../../label/Label';
import CanvasInput from '../../canvasinput/CanvasInput';

export default ColorComponents;

declare namespace ColorComponents {

    /**
     * Layout and style configuration for the format label.
     */
    interface IFormatLabelConfig {
        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,
        },

        /**
         * Background style configuration.
         */
        background?: RoundRectangle.IConfig,

        /**
         * Text style configuration.
         */
        text?: Phaser.GameObjects.TextStyle,
        /**
         * Set to true to expand text width.
         */
        expandTextWidth?: boolean,
        /**
         * Set to true to expand text height.
         */
        expandTextHeight?: boolean,

        /**
         * Alignment of label content.
         */
        align?: Label.AlignTypes,
    }

    /**
     * Callback invoked when component value changes.
     */
    type ValueChangeCallbackType = (
        /**
         * New color value.
         */
        newValue: number,
        /**
         * Previous color value.
         */
        oldValue: number,
        /**
         * Color components instance.
         */
        colorComponents: ColorComponents
    ) => void;

    /**
     * Configuration options for creating color components UI.
     */
    interface IConfig extends Sizer.IConfig {
        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Format label game object or label configuration.
         */
        formatLabel?: Phaser.GameObjects.GameObject | IFormatLabelConfig;

        /**
         * First input text game object.
         */
        inputText0?: Phaser.GameObjects.GameObject,
        /**
         * Second input text game object.
         */
        inputText1?: Phaser.GameObjects.GameObject,
        /**
         * Third input text game object.
         */
        inputText2?: Phaser.GameObjects.GameObject,
        /**
         * Input text configuration used when auto-creating input fields.
         */
        inputText?: CanvasInput.IConfig,

        proportion?: {
            /**
             * Proportion value of the format label section.
             */
            formatLabel?: number,

        },

        /**
         * Callback fired when value changes.
         */
        valuechangeCallback: ValueChangeCallbackType,

        /**
         * Initial color value.
         */
        value?: number
    }
}

/**
 * UI component for editing color values in RGB/HSV formats.
 */
declare class ColorComponents extends Sizer {
    /**
     * Create a color components UI.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional component configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ColorComponents.IConfig
    );

    /**
     * Set numeric color value.
     *
     * @param value - Color value to assign.
     * @returns This component instance.
     */
    setValue(value: number): this;
    /**
     * Current numeric color value.
     */
    value: number;

    /**
     * Set numeric color value.
     *
     * @param color - Color value to assign.
     * @returns This component instance.
     */
    setColor(color: number): this;
    /**
     * Current numeric color value.
     */
    color: number;

    /**
     * Set displayed color format.
     *
     * @param colorFormat - Target format.
     * @returns This component instance.
     */
    setColorFormat(colorFormat: 'RGB' | 'HSV'): this;
    /**
     * Toggle displayed color format between RGB and HSV.
     *
     * @returns This component instance.
     */
    toggleColorFormat(): this;
    /**
     * Current displayed color format.
     */
    colorFormat: 'RGB' | 'HSV';
}
