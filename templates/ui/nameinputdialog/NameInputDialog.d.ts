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
    /**
     * Alignment options for dialog sections.
     */
    type AlignTypes = number | 'left' | 'center' | 'right';

    /**
     * Click behavior configuration for dialog buttons.
     */
    interface IConfigClick {
        /**
         * Click trigger mode.
         */
        mode: 0 | 1 | 'pointerup' | 'pointerdown' | 'release' | 'press',
        /**
         * Minimum interval between clicks in milliseconds.
         */
        clickInterval?: number
    }

    /**
     * Configuration options for creating a name input dialog.
     */
    interface IConfig extends BaseSizer.IConfig {
        /**
         * Initial x position.
         */
        x?: number,
        /**
         * Initial y position.
         */
        y?: number,
        /**
         * Initial width.
         */
        width?: number,
        /**
         * Initial height.
         */
        height?: number,

        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,

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

        /**
         * Background style configuration.
         */
        background?: CreateBackground.IConfig,

        /**
         * Title style configuration.
         */
        title?: SimpleLabel.IConfig,

        /**
         * Layout orientation mode.
         */
        layoutMode?: Sizer.OrientationTypes,

        /**
         * First name title style configuration.
         */
        firstNameTitle?: SimpleLabel.IConfig,

        /**
         * First name input style configuration.
         */
        firstNameInput?: InputText.IConfig,

        /**
         * Last name title style configuration.
         */
        lastNameTitle?: SimpleLabel.IConfig,

        /**
         * Last name input style configuration.
         */
        lastNameInput?: InputText.IConfig,

        /**
         * Confirm button style configuration.
         */
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

        /**
         * Click behavior configuration.
         */
        click?: IConfigClick,

        /**
         * Modal behavior configuration.
         */
        modal?: Dialog.IModalConfig
    }

    /**
     * Display-content configuration for a choice item.
     */
    interface IResetChoiceDisplayContentConfig extends Label.IResetDisplayContentConfig {
        /**
         * Custom value of the choice item.
         */
        value?: any;
    }

    /**
     * Display-content configuration for runtime dialog reset.
     */
    interface IResetDisplayContentConfig {
        /**
         * Title text or label config.
         */
        title?: string | Label.IResetDisplayContentConfig,
        /**
         * First name title text or label config.
         */
        firstNameTitle?: string | Label.IResetDisplayContentConfig,
        /**
         * Last name title text or label config.
         */
        lastNameTitle?: string | Label.IResetDisplayContentConfig,
        /**
         * Confirm button text or label config.
         */
        button?: string | Label.IResetDisplayContentConfig,

        /**
         * First name input value.
         */
        firstName?: string,
        /**
         * Last name input value.
         */
        lastName?: string,
    }

    /**
     * Factory callbacks used to create dialog sub-objects.
     */
    interface ICreatorsConfig {
        background?: GeneralCreateGameObjectCallbackType,
        title?: SimpleLabel.ICreatorsConfig,
        firstNameTitle?: SimpleLabel.ICreatorsConfig,
        lastNameTitle?: SimpleLabel.ICreatorsConfig,
        button?: SimpleLabel.ICreatorsConfig,
    }

    /**
     * Modal behavior options for this dialog.
     */
    interface IModalConfig extends Dialog.IModalConfig {
    }

    /**
     * Data payload passed when dialog closes.
     */
    interface ICloseEventData extends Dialog.ICloseEventData {
        /**
         * Current first name value.
         */
        firstName: string,
        /**
         * Current last name value.
         */
        lastName: string,
    }

    /**
     * Callback invoked when modal dialog closes.
     */
    type OnModalCloseCallbackType = (
        /**
         * Close payload or dialog instance.
         */
        data: ICloseEventData | NameInputDialog
    ) => void;
}

/**
 * Dialog component that collects first and last name inputs.
 */
declare class NameInputDialog extends Dialog {
    /**
     * Create a name input dialog.
     *
     * @param scene - Scene that owns this dialog.
     * @param config - Optional dialog configuration.
     * @param creators - Optional custom creators for dialog sub-objects.
     */
    constructor(
        scene: Phaser.Scene,
        config?: NameInputDialog.IConfig,
        creators?: NameInputDialog.ICreatorsConfig
    );

    /**
     * Set first name value.
     *
     * @param value - First name string.
     * @returns This dialog instance.
     */
    setFirstName(value: string): this;
    /**
     * Current first name value.
     */
    firstName: string;

    /**
     * Set last name value.
     *
     * @param value - Last name string.
     * @returns This dialog instance.
     */
    setlastName(value: string): this;
    /**
     * Current last name value.
     */
    lastName: string;

    /**
     * Reset displayed title/input/button content.
     *
     * @param config - Optional display-content configuration.
     * @returns This dialog instance.
     */
    resetDisplayContent(
        config?: NameInputDialog.IResetDisplayContentConfig
    ): this;

    /**
     * Open dialog as a modal with optional configuration.
     *
     * @param config - Optional modal configuration.
     * @param onClose - Optional callback invoked on close.
     * @returns This dialog instance.
     */
    modal(
        config?: NameInputDialog.IModalConfig,
        onClose?: NameInputDialog.OnModalCloseCallbackType
    ): this;

    /**
     * Open dialog as a modal with close callback.
     *
     * @param onClose - Optional callback invoked on close.
     * @returns This dialog instance.
     */
    modal(
        onClose?: NameInputDialog.OnModalCloseCallbackType
    ): this;

    /**
     * Open dialog as a modal and return a close promise.
     *
     * @param config - Optional modal configuration.
     * @returns Promise resolved with close payload or dialog.
     */
    modalPromise(
        config?: NameInputDialog.IModalConfig
    ): Promise<NameInputDialog.ICloseEventData | NameInputDialog>;

    /**
     * Close the modal dialog programmatically.
     *
     * @param closeEventData - Optional close payload data.
     * @returns This dialog instance.
     */
    modalClose(closeEventData?: NameInputDialog.ICloseEventData): this;
}
