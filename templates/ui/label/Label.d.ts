import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import { IConfig as IConfigBase } from '../sizer/Sizer';

type AlignTypes = 'left' | 'top' | 'right' | 'bottom' | 'center';

export interface IConfig extends IConfigBase {
    space?: {
        left?: number, right?: number, top?: number, bottom?: number,

        icon?: number,
        text?: number,
    },

    background?: Phaser.GameObjects.GameObject,

    icon?: Phaser.GameObjects.GameObject,
    iconMask?: boolean,

    text?: Phaser.GameObjects.GameObject,
    expandTextWidth?: boolean,
    expandTextHeight?: boolean,

    action?: Phaser.GameObjects.GameObject,
    actionMask?: boolean,

    align?: AlignTypes,
}

export default class Label extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    );

    text: string;

    setText(text: string): this;

    appendText(text: string): this;
}