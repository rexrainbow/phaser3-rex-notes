import Sizer from '../../sizer/Sizer';
import RoundRectangle from '../../roundrectangle/RoundRectangle';
import Label from '../../label/Label';
import DropDownList from '../../dropdownlist/DropDownList';
import CanvasInput from '../../canvasinput/CanvasInput';

export default ColorComponents;

declare namespace ColorComponents {

    interface ILabelConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,
        },

        background?: RoundRectangle.IConfig,

        text?: Phaser.GameObjects.TextStyle,
        expandTextWidth?: boolean,
        expandTextHeight?: boolean,

        align?: Label.AlignTypes,

    }

    interface IInteractiveRoundRectangleConfig extends RoundRectangle.IConfig {
        'active.color'?: number,
        'active.alpha'?: number,
        'active.strokeColor'?: number,
        'active.strokeAlpha'?: number,
        'active.strokeWidth'?: number,
    }

    interface IInteractiveLabelConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,
        },

        background?: IInteractiveRoundRectangleConfig,

        text?: Phaser.GameObjects.TextStyle
        expandTextWidth?: boolean,
        expandTextHeight?: boolean,

        align?: Label.AlignTypes,

    }

    interface IConfig extends Sizer.IConfig {
        background?: Phaser.GameObjects.GameObject,

        list?: {
            label?: ILabelConfig
            button?: IInteractiveLabelConfig,

            easeIn?: number,
            easeOut?: number,

            wrap?: boolean;
            width?: number;
            height?: number;
            alignParent?: DropDownList.AlignParentType;
            expandDirection?: DropDownList.ExpandDirectionType;
            bounds?: Phaser.Geom.Rectangle;

            space?: DropDownList.ListSpaceType | DropDownList.WrapListSpaceType;
        }

        inputText?: CanvasInput.IConfig,

        valuechangeCallback: (newValue: number, oldValue: number, colorComponents: ColorComponents) => void,

        value?: number
    }
}

declare class ColorComponents extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: ColorComponents.IConfig
    );

    setValue(value: number): this;
    value: number;

    setColor(color: number): this;
    color: number;

    setColorType(colorType: 'RGB' | 'HSV'): this;
    colorType: 'RGB' | 'HSV';
}