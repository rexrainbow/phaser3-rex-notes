import Dialog from '../dialog/Dialog';
import BBCodeText from '../bbcodetext/BBCodeText';
import Label from '../label/Label';
import { ModalBehavoir } from '../modal/Modal';

export default ConfirmDialog;

declare namespace ConfirmDialog {
    interface IRoundRectangleConfig {
        width?: number,
        height?: number,
        radius?: number | {
            tl?: (number | { x?: number, y?: number }),
            tr?: (number | { x?: number, y?: number }),
            bl?: (number | { x?: number, y?: number }),
            br?: (number | { x?: number, y?: number }),

            x?: number,
            y?: number,
        },

        color?: number,
        alpha?: number,

        strokeColor?: number,
        strokeAlpha?: number,
        strokeWidth?: number,
    }

    interface ILabelConfig {
        background?: IRoundRectangleConfig,

        text?: BBCodeText.TextStyle,

        iconMask?: boolean,
        iconSize?: number, iconWidth?: number, iconHeight?: number,
        actionMask?: boolean,
        actionSize?: number, actionWidth?: number, actionHeight?: number,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            icon?: number,
            text?: number,
        },
    }

    type AlignTypes = number | 'left' | 'center' | 'right';

    interface IConfigClick {
        mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
        clickInterval?: number
    }

    interface IConfig {
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

        background?: IRoundRectangleConfig,

        title?: ILabelConfig,

        content?: ILabelConfig,

        buttonMode?: 0 | 1 | 2;
        buttonA?: ILabelConfig,
        buttonB?: ILabelConfig,
        button?: ILabelConfig,

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

    modal(
        config?: ModalBehavoir.IConfig,
        onClose?: (closeEventData: any) => void
    ): this;

    modal(
        onClose?: (closeEventData: any) => void
    ): this;

    modalPromise(
        config?: ModalBehavoir.IConfig
    ): Promise<any>
}