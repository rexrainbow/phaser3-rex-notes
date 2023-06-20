// import * as Phaser from 'phaser';
import LabelBase from '../label/Base';
import Sizer from '../sizer/Sizer';

export default TitleLabel;

declare namespace TitleLabel {

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            icon?: number, iconTop?: number, iconBottom?: number, iconLeft?: number, iconRight?: number,
            text?: number,
            separator?: number, separatorLeft?: number, separatorRight?: number,
        },

        background?: Phaser.GameObjects.GameObject,

        icon?: Phaser.GameObjects.GameObject,
        iconMask?: boolean,

        textOrientation?: Sizer.OrientationTypes;
        title?: Phaser.GameObjects.GameObject,
        separator?: Phaser.GameObjects.GameObject,
        text?: Phaser.GameObjects.GameObject,

        action?: Phaser.GameObjects.GameObject,
        actionMask?: boolean,

        align?: {
            text?: 'left' | 'right' | 'center' | number,
            title?: 'left' | 'right' | 'center' | number,
        },

        proportion?: {
            title?: number,
            separator?: number,
            text?: number,
        }
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
}