import Sizer from '../../sizer/Sizer';

export default ColorPicker;

declare namespace ColorPicker {
    interface IConfig {
        background?: Phaser.GameObjects.GameObject,

        hPalette?: {
            position?: 'bottom' | 0 | 'left' | 1 | 'top' | 2 | 'right' | 3,
            size?: number, width?: number, height?: number,
        },

        svPalette?: {
            width?: number, height?: number,
        },

        valuechangeCallback: (newValue: number, oldValue: number, colorPicker: ColorPicker) => void,

        value?: number,
    }
}

declare class ColorPicker extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: ColorPicker.IConfig
    );

    setValue(value: number): this;
    value: number;

    setColor(color: number): this;
    color: number;


}