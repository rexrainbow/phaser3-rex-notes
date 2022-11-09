import Sizer from '../../sizer/Sizer';

export default ColorPicker;

declare namespace ColorPicker {
    interface IConfig {
        background?: Phaser.GameObjects.GameObject,

        hPalette?: {
            width?: number, height?: number, size?: number,
            position?: 'bottom' | 0 | 'left' | 1 | 'top' | 2 | 'right' | 3,
        },

        svPalette?: {
            width?: number, height?: number,
        },

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