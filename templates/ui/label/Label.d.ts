// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default Label;

declare namespace Label {

    type AlignTypes = 'left' | 'top' | 'right' | 'bottom' | 'center';

    interface IConfig extends Sizer.IConfig {
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
}

declare class Label extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: Label.IConfig
    );

    text: string;

    setText(text: string): this;

    appendText(text: string): this;
}