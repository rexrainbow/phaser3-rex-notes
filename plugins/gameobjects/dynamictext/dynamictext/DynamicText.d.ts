// import * as Phaser from 'phaser';
import Canvas from '../../canvas/canvas/Canvas';
import { IConfigTextStyle } from './bob/char/TextStyle';
import CharBobClass from './bob/char/CharData';
import ImageBobClass from './bob/image/ImageData';
import CommandBobClass from './bob/command/Command';


export default DynamicText;

declare namespace DynamicText {

    type PaddingTypes = number |
    { left?: number, right?: number, top?: number, bottom?: number };

    interface IRadiusConfig {
        tl?: (number | { x?: number, y?: number }),
        tr?: (number | { x?: number, y?: number }),
        bl?: (number | { x?: number, y?: number }),
        br?: (number | { x?: number, y?: number })
    }

    interface IConfigBackground {
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean,

        stroke?: string | number | null,
        strokeThickness?: number,

        cornerRadius?: number |
        ({ x?: number, y?: number }) |
        IRadiusConfig,
        cornerIteration?: number
    }

    interface IConfigInnerBounds {
        color?: string | number | null,
        color2?: string | number | null,
        horizontalGradient?: boolean,

        stroke?: string | number | null,
        strokeThickness?: number,
    }

    interface IConfigImage {
        width?: number,
        height?: number,
        scaleX?: number,
        scaleY?: number,
    }

    type HAlignTypes = 0 | 1 | 2 | 'left' | 'center' | 'right';
    type VAlignTypes = 0 | 1 | 2 | 'top' | 'center' | 'bottom';

    interface IConfigWordWrap {
        padding?: {
            top?: number, bottom?: number,
        },
        lineHeight?: number,
        maxLines?: number,
        wrapWidth?: number,
        letterSpacing?: number,
        hAlign?: HAlignTypes,
        vAlign?: VAlignTypes,
        charWrap?: boolean
    }

    interface IConfigVerticalWrap {
        padding: {
            top?: number, left?: number, right?: number, bottom?: number,
        },
        lineWidth?: number,
        maxLines?: number,
        fixedChildHeight?: number,
        charPerLine?: number,
        wrapHeight?: number,
        letterSpacing?: number,
        rtl?: boolean,
        hAlign?: HAlignTypes,
        vAlign?: VAlignTypes,
    }

    type CharBob = CharBobClass;
    type ImageBob = ImageBobClass;
    type CommandBob = CommandBobClass;
    type RenderChildTypes = CharBob | ImageBob;
    type ChildTypes = CharBob | ImageBob | CommandBob;

    interface IWrapResult {
        children: ChildTypes[],
        lines: ({
            children: ChildTypes[],
            width: number,
            height: number
        })[],
        isLastPage: boolean
    }

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        padding: PaddingTypes,

        background?: IConfigBackground,

        innerBounds?: IConfigInnerBounds,

        style?: IConfigTextStyle,

        text?: string,

        wrap?: IConfigWordWrap | IConfigVerticalWrap
    }

}

declare class DynamicText extends Canvas {
    constructor(
        scene: Phaser.Scene,
        config?: DynamicText.IConfig
    );

    clearContent(): this;

    appendText(
        text: string,
        style?: IConfigTextStyle
    ): this;

    appendImage(
        key: string, frame?: string | null,
        config?: DynamicText.IConfigImage
    ): this;

    runWordWrap(
        config?: DynamicText.IConfigWordWrap
    ): DynamicText.IWrapResult;

    runVerticalWrap(
        config?: DynamicText.IConfigVerticalWrap
    ): DynamicText.IWrapResult;

    getChildren(): DynamicText.ChildTypes[];
    getLastAppendedChildren(): DynamicText.ChildTypes[];
    getActiveChildren(): DynamicText.ChildTypes[];
}