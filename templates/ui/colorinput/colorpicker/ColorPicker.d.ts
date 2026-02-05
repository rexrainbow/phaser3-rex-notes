import Sizer from '../../sizer/Sizer';

export default ColorPicker;

declare namespace ColorPicker {
    /**
     * Callback invoked when picker value changes.
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
         * Color picker instance.
         */
        colorPicker: ColorPicker
    ) => void;

    /**
     * Configuration options for creating a color picker.
     */
    interface IConfig extends Sizer.IConfig {
        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        hPalette?: {
            /**
             * Position of hue palette.
             */
            position?: 0 | 1 | 2 | 3 | 'bottom' | 'left' | 'top' | 'right',
            /**
             * Size of hue palette.
             */
            size?: number,
            /**
             * Width of hue palette.
             */
            width?: number,
            /**
             * Height of hue palette.
             */
            height?: number,
        },

        svPalette?: {
            /**
             * Width of saturation-value palette.
             */
            width?: number,
            /**
             * Height of saturation-value palette.
             */
            height?: number,
        },

        /**
         * Callback fired when value changes.
         */
        valuechangeCallback: ValueChangeCallbackType,
        /**
         * Scope used when invoking value change callback.
         */
        valuechangeCallbackScope?: Object,

        /**
         * Initial color value.
         */
        value?: number,
    }
}

/**
 * UI color picker with hue and saturation-value palettes.
 */
declare class ColorPicker extends Sizer {
    /**
     * Create a color picker.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional color picker configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ColorPicker.IConfig
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
