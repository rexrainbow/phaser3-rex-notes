// import * as Phaser from 'phaser';
import LabelBase from '../label/Base';
import Sizer from '../sizer/Sizer';

export default TitleLabel;

declare namespace TitleLabel {

    interface IConfig extends Sizer.IConfig {
        layoutMode?: 0 | 1,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number, item?: number,

            innerLeft?: number, innerRight?: number, innerTop?: number, innerBottom?: number,

            title?: number, titleLeft?: number, titleRight?: number,
            separator?: number, separatorLeft?: number, separatorRight?: number,
            text?: number, textLeft?: number, textRight?: number,

            icon?: number, iconTop?: number, iconBottom?: number, iconLeft?: number, iconRight?: number,
            actionTop?: number, actionBottom?: number, actionLeft?: number, actionRight?: number,
        },

        background?: Phaser.GameObjects.GameObject,

        innerBackground?: Phaser.GameObjects.GameObject,

        title?: Phaser.GameObjects.GameObject,
        wrapTitle?: boolean | 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character',
        adjustTitleFontSize?: boolean,
        expandTitleWidth?: boolean,
        expandTitleHeight?: boolean,

        separator?: Phaser.GameObjects.GameObject,

        text?: Phaser.GameObjects.GameObject,
        wrapText?: boolean | 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character',
        adjustTextFontSize?: boolean,
        expandTextWidth?: boolean,
        expandTextHeight?: boolean,

        icon?: Phaser.GameObjects.GameObject,
        iconMask?: boolean,
        squareFitIcon?: boolean,
        iconSize?: number, iconWidth?: number, iconHeight?: number,

        action?: Phaser.GameObjects.GameObject,
        actionMask?: boolean,
        squareFitAction?: boolean,
        actionSize?: number, actionWidth?: number, actionHeight?: number,

        align?: {
            text?: 'left' | 'right' | 'center' | number,
            title?: 'left' | 'right' | 'center' | number,
            icon?: 'top' | 'bottom' | 'center' | number,
            action?: 'top' | 'bottom' | 'center' | number,
        },

        proportion?: {
            title?: number,
            separator?: number,
            text?: number,
        }
    }

    interface IResetDisplayContentConfig extends LabelBase.IResetDisplayContentConfig {
        title?: string,
    }
}

declare class TitleLabel extends LabelBase {
    constructor(
        scene: Phaser.Scene,
        config?: TitleLabel.IConfig
    );

    title: string;
    setTitle(text: string): this;
    appendTitle(text: string): this;

    resetDisplayContent(
        config?: string | TitleLabel.IResetDisplayContentConfig
    ): this;
}