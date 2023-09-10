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
        squareFitIcon?: boolean,
        iconSize?: number, iconWidth?: number, iconHeight?: number,

        text?: Phaser.GameObjects.GameObject,
        expandTextWidth?: boolean,
        expandTextHeight?: boolean,

        action?: Phaser.GameObjects.GameObject,
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