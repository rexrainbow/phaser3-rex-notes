import Dialog from '../dialog/Dialog';
import BaseSizer from '../basesizer/BaseSizer';
import { GeneralCreateGameObjectCallbackType } from '../utils/build/GeneralCreateGameObjectCallbackType';
import CreateBackground from '../utils/build/CreateBackground';
import SimpleLabel from '../simplelabel/SimpleLabel';
import CreateTextArea from '../utils/build/CreateTextArea';
import Label from '../label/Label';

export default ConfirmDialog;

declare namespace ConfirmDialog {
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
     * Configuration options for creating a confirm dialog.
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

            content?: number,
            contentLeft?: number,
            contentRight?: number,

            actionsLeft?: number,
            actionsRight?: number,
            action?: number,

            choices?: number,
            choicesLeft?: number,
            choicesRight?: number,
            choice?: number,
            choiceLine?: number,
            choiceColumn?: number,
            choiceRow?: number,
            choicesBackgroundLeft?: number,
            choicesBackgroundRight?: number,
            choicesBackgroundTop?: number,
            choicesBackgroundBottom?: number,
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
         * Content style configuration.
         */
        content?: SimpleLabel.IConfig | CreateTextArea.IConfig,

        /**
         * Button mode preset.
         */
        buttonMode?: 0 | 1 | 2;
        /**
         * Shared button style configuration.
         */
        button?: SimpleLabel.IConfig,
        /**
         * Confirm button style configuration.
         */
        buttonA?: SimpleLabel.IConfig,
        /**
         * Cancel button style configuration.
         */
        buttonB?: SimpleLabel.IConfig,

        /**
         * Choices layout type.
         */
        choicesType?: string,
        /**
         * Choice item style configuration.
         */
        choice?: SimpleLabel.IConfig,
        /**
         * Width of choices area.
         */
        choicesWidth?: number,
        /**
         * Height of choices area.
         */
        choicesHeight?: number,

        proportion?: {
            title?: number,
            content?: number,
            actions?: number,
            choices?: number,
        },

        expand?: {
            title?: boolean,
            content?: boolean,
            actions?: boolean,
            choices?: boolean,
        },

        align?: {
            title?: AlignTypes,
            content?: AlignTypes,
            actions?: AlignTypes,
            choices?: AlignTypes,
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
     * Display-content configuration for a single choice item.
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
         * Content text or label config.
         */
        content?: string | Label.IResetDisplayContentConfig,

        /**
         * Confirm button text or label config.
         */
        buttonA?: string | Label.IResetDisplayContentConfig,
        /**
         * Cancel button text or label config.
         */
        buttonB?: string | Label.IResetDisplayContentConfig,

        /**
         * Choice item texts or configs.
         */
        choices?: (string | IResetChoiceDisplayContentConfig)[]
    }

    /**
     * Factory callbacks used to create dialog sub-objects.
     */
    interface ICreatorsConfig {
        background?: GeneralCreateGameObjectCallbackType,
        title?: SimpleLabel.ICreatorsConfig,
        content?: SimpleLabel.ICreatorsConfig | CreateTextArea.ICreatorsConfig,
        button?: SimpleLabel.ICreatorsConfig,
        buttonA?: SimpleLabel.ICreatorsConfig,
        buttonB?: SimpleLabel.ICreatorsConfig,
        choice?: SimpleLabel.ICreatorsConfig,
    }
}

/**
 * Confirm dialog UI component built on top of `Dialog`.
 */
declare class ConfirmDialog extends Dialog {
    /**
     * Create a confirm dialog.
     *
     * @param scene - Scene that owns this dialog.
     * @param config - Optional dialog configuration.
     * @param creators - Optional custom creators for dialog sub-objects.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ConfirmDialog.IConfig,
        creators?: ConfirmDialog.ICreatorsConfig
    );

    /**
     * Set confirm button index.
     *
     * @param index - Index treated as confirm action.
     * @returns This dialog instance.
     */
    setConfirmButtonIndex(index: number): this;
    /**
     * Index treated as confirm action.
     */
    confirmButtonIndex: number;

    /**
     * Set cancel button index.
     *
     * @param index - Index treated as cancel action.
     * @returns This dialog instance.
     */
    setCancelButtonIndex(index: number): this;
    /**
     * Index treated as cancel action.
     */
    cancelButtonIndex: number;

    /**
     * Reset displayed title/content/buttons/choices.
     *
     * @param config - Optional display-content configuration.
     * @returns This dialog instance.
     */
    resetDisplayContent(
        config?: ConfirmDialog.IResetDisplayContentConfig
    ): this;
}
