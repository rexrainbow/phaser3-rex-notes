import Sizer from '../../sizer/Sizer';
import RoundRectangle from '../../roundrectangle/RoundRectangle';
import CanvasInput from '../../canvasinput/CanvasInput';

export default ColorInputBase;

declare namespace ColorInputBase {
    /**
     * Visual configuration of the swatch object.
     */
    interface ISwatchConfig extends RoundRectangle.IConfig {
        /**
         * Swatch size.
         */
        size?: number,
    }

    /**
     * Callback invoked when color value changes.
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
         * Color input base instance.
         */
        colorPicker: ColorInputBase
    ) => void;

    /**
     * Configuration options for creating a base color input component.
     */
    interface IConfig extends Sizer.IConfig {
        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Swatch game object or swatch style configuration.
         */
        swatch?: Phaser.GameObjects.GameObject | ISwatchConfig,
        /**
         * Size of auto-created swatch.
         */
        swatchSize?: number,
        /**
         * Set to true to keep swatch square while expanding.
         */
        squareExpandSwatch?: boolean,

        /**
         * Input text configuration.
         */
        inputText?: CanvasInput.IConfig,

        /**
         * Callback fired when value changes.
         */
        valuechangeCallback: ValueChangeCallbackType,

        /**
         * Initial color value.
         */
        value?: number | string
    }
}

/**
 * Base color input UI with swatch and editable value field.
 */
declare class ColorInputBase extends Sizer {
    /**
     * Create a base color input component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional component configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ColorInputBase.IConfig
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
}
