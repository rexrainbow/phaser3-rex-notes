// import * as Phaser from 'phaser';
import LabelBase from './Base';
import Sizer from '../sizer/Sizer';

export default Label;

declare namespace Label {

    type AlignTypes = 'left' | 'top' | 'right' | 'bottom' | 'center';

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            icon?: number,
            iconTop?: number, iconBottom?: number, iconLeft?: number, iconRight?: number,

            text?: number,

            actionTop?: number, actionBottom?: number, actionLeft?: number, actionRight?: number,
        },

        background?: Phaser.GameObjects.GameObject,

        icon?: Phaser.GameObjects.GameObject,
        iconMask?: boolean,
        squareFitIcon?: boolean,
        iconSize?: number, iconWidth?: number, iconHeight?: number,

        text?: Phaser.GameObjects.GameObject,
        wrapText?: boolean | 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character',
        adjustTextFontSize?: boolean,
        expandTextWidth?: boolean,
        expandTextHeight?: boolean,

        action?: Phaser.GameObjects.GameObject,
        actionMask?: boolean,
        squareFitAction?: boolean,
        actionSize?: number, actionWidth?: number, actionHeight?: number,

        align?: AlignTypes,
    }

    interface IResetDisplayContentConfig extends LabelBase.IResetDisplayContentConfig {

    }
}

declare class Label extends LabelBase {
    constructor(
        scene: Phaser.Scene,
        config?: Label.IConfig
    );
}