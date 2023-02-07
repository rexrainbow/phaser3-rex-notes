import Dialog from '../dialog/Dialog';
import CreateBackground from '../utils/build/CreateBackground';
import SimpleLabel from '../simplelabel/SimpleLabel';
import Label from '../label/Label';

export default ConfirmDialog;

declare namespace ConfirmDialog {
    type AlignTypes = number | 'left' | 'center' | 'right';

    interface IConfigClick {
        mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
        clickInterval?: number
    }

    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            title?: number,
            titleLeft?: number,
            titleRight?: number,

            content?: number,
            contentLeft?: number,
            contentRight?: number,

            choicesRight?: number,
            actionsLeft?: number,
            actionsRight?: number,

            action?: number,
        };

        background?: CreateBackground.IConfig,

        title?: SimpleLabel.IConfig,

        content?: SimpleLabel.IConfig,

        buttonMode?: 0 | 1 | 2;
        button?: SimpleLabel.IConfig,
        buttonA?: SimpleLabel.IConfig,
        buttonB?: SimpleLabel.IConfig,

        proportion?: {
            title?: number,
            content?: number,
            actions?: number,
        },

        expand?: {
            title?: boolean,
            content?: boolean,
            actions?: boolean,
        },

        align?: {
            title?: AlignTypes,
            content?: AlignTypes,
            actions?: AlignTypes,
        },

        click?: IConfigClick
    }

    interface IResetDisplayContentConfig {
        title?: string | Label.IResetDisplayContentConfig,
        content?: string | Label.IResetDisplayContentConfig,
        buttonA?: string | Label.IResetDisplayContentConfig,
        buttonB?: string | Label.IResetDisplayContentConfig,
    }
}

declare class ConfirmDialog extends Dialog {
    constructor(
        scene: Phaser.Scene,
        config?: ConfirmDialog.IConfig
    );

    resetDisplayContent(
        config?: ConfirmDialog.IResetDisplayContentConfig
    ): this;
}