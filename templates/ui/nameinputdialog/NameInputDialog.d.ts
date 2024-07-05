import Dialog from '../dialog/Dialog';
import Sizer from '../sizer/Sizer';
import BaseSizer from '../basesizer/BaseSizer';
import { GeneralCreateGameObjectCallbackType } from '../utils/build/GeneralCreateGameObjectCallbackType';
import CreateBackground from '../utils/build/CreateBackground';
import SimpleLabel from '../simplelabel/SimpleLabel';
import InputText from '../canvasinput/CanvasInput';
import Label from '../label/Label';

export default NameInputDialog;

declare namespace NameInputDialog {
    type AlignTypes = number | 'left' | 'center' | 'right';

    interface IConfigClick {
        mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
        clickInterval?: number
    }

    interface IConfig extends BaseSizer.IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            title?: number,
            titleLeft?: number,
            titleRight?: number,

            names?: number,
            namesLeft?: number,
            namesRight?: number,
            firstName?: number,
            firstNameTitle?: number,
            lastNameTitle?: number,

            actionsLeft?: number,
            actionsRight?: number,
            action?: number,
        };

        background?: CreateBackground.IConfig,

        title?: SimpleLabel.IConfig,

        layoutMode?: Sizer.OrientationTypes,

        firstNameTitle?: SimpleLabel.IConfig,

        firstNameInput?: InputText.IConfig,

        lastNameTitle?: SimpleLabel.IConfig,

        lastNameInput?: InputText.IConfig,

        button?: SimpleLabel.IConfig,

        proportion?: {
            firstName?: number,
            firstNameTitle?: number,

            lastName?: number,
            lastNameTitle?: number,
        },

        expand?: {
            title?: boolean,
            actions?: boolean,
        },

        align?: {
            title?: AlignTypes,
            content?: AlignTypes,
            actions?: AlignTypes,
        },

        click?: IConfigClick,

        modal?: Dialog.IModalConfig
    }

    interface IResetChoiceDisplayContentConfig extends Label.IResetDisplayContentConfig {
        value?: any;
    }

    interface IResetDisplayContentConfig {
        title?: string | Label.IResetDisplayContentConfig,
        firstNameTitle?: string | Label.IResetDisplayContentConfig,
        lastNameTitle?: string | Label.IResetDisplayContentConfig,
        button?: string | Label.IResetDisplayContentConfig,

        firstName?: string,
        lastName?: string,
    }

    interface ICreatorsConfig {
        background?: GeneralCreateGameObjectCallbackType,
        title?: SimpleLabel.ICreatorsConfig,
        firstNameTitle?: SimpleLabel.ICreatorsConfig,
        lastNameTitle?: SimpleLabel.ICreatorsConfig,
        button?: SimpleLabel.ICreatorsConfig,
    }

    interface IModalConfig extends Dialog.IModalConfig {
    }

    interface ICloseEventData extends Dialog.ICloseEventData {
        firstName: string,
        lastName: string,
    }

    type OnModalCloseCallbackType = (data: ICloseEventData | NameInputDialog) => void;
}

declare class NameInputDialog extends Dialog {
    constructor(
        scene: Phaser.Scene,
        config?: NameInputDialog.IConfig,
        creators?: NameInputDialog.ICreatorsConfig
    );

    setFirstName(value: string): this;
    firstName: string;

    setlastName(value: string): this;
    lastName: string;

    resetDisplayContent(
        config?: NameInputDialog.IResetDisplayContentConfig
    ): this;

    modal(
        config?: NameInputDialog.IModalConfig,
        onClose?: NameInputDialog.OnModalCloseCallbackType
    ): this;

    modal(
        onClose?: NameInputDialog.OnModalCloseCallbackType
    ): this;

    modalPromise(
        config?: NameInputDialog.IModalConfig,
    ): Promise<NameInputDialog.ICloseEventData | NameInputDialog>;

    modalClose(closeEventData?: NameInputDialog.ICloseEventData): this;
}