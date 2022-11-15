import Sizer from '../../sizer/Sizer';
import RoundRectangle from '../../roundrectangle/RoundRectangle'
import CanvasInput from '../../canvasinput/CanvasInput';

export default ColorInputLite;

declare namespace ColorInputLite {
    interface IConfig extends Sizer.IConfig {
        background?: Phaser.GameObjects.GameObject,

        swatch?: Phaser.GameObjects.GameObject | RoundRectangle.IConfig,

        inputText?: CanvasInput.IConfig,

        valuechangeCallback: (newValue: number, oldValue: number, colorPicker: ColorInputLite) => void,

        value?: number | string
    }
}

declare class ColorInputLite extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: ColorInputLite.IConfig
    );

    setValue(value: number): this;
    value: number;

    setColor(color: number): this;
    color: number;
}