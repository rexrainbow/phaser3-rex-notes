// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';
import { ModalBehavoir } from '../modal/Modal';

export default Dialog;

declare namespace Dialog {
    /**
     * Alignment options for dialog sections.
     */
    type AlignTypes = number | 'left' | 'center' | 'right';

    /**
     * Callback invoked while iterating dialog button groups.
     */
    type EachButtonCallbackType = (
        /**
         * Current button game object.
         */
        button: Phaser.GameObjects.GameObject,
        /**
         * Zero-based button index.
         */
        index: number,
        /**
         * Full button list.
         */
        buttons: Phaser.GameObjects.GameObject[]
    ) => void;

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
     * Dialog construction options.
     */
    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number,

            title?: number,
            titleLeft?: number,
            titleRight?: number,
            titleTop?: number,

            content?: number,
            contentLeft?: number,
            contentRight?: number,

            description?: number,
            descriptionLeft?: number,
            descriptionRight?: number,

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

            action?: number,
            actionsLeft?: number,
            actionsRight?: number,
            actionsBottom?: number,

            toolbarItem?: number,
            leftToolbarItem?: number,

        };

        /**
         * Optional background game object.
         */
        background?: Phaser.GameObjects.GameObject,

        /**
         * Optional title game object.
         */
        title?: Phaser.GameObjects.GameObject,

        /**
         * Optional toolbar button list.
         */
        toolbar?: Phaser.GameObjects.GameObject[],

        /**
         * Optional toolbar background game object.
         */
        toolbarBackground?: Phaser.GameObjects.GameObject,

        /**
         * Optional left-toolbar button list.
         */
        leftToolbar?: Phaser.GameObjects.GameObject[],

        /**
         * Optional left-toolbar background game object.
         */
        leftToolbarBackground?: Phaser.GameObjects.GameObject,

        /**
         * Optional content game object.
         */
        content?: Phaser.GameObjects.GameObject,

        /**
         * Optional description game object.
         */
        description?: Phaser.GameObjects.GameObject,

        /**
         * Layout type of the choices section.
         */
        choicesType?: string,
        /**
         * Width of the choices section.
         */
        choicesWidth?: number,
        /**
         * Height of the choices section.
         */
        choicesHeight?: number,
        /**
         * Optional choices button list.
         */
        choices?: Phaser.GameObjects.GameObject[],
        /**
         * Optional choices background game object.
         */
        choicesBackground?: Phaser.GameObjects.GameObject,

        /**
         * Optional action button list.
         */
        actions?: Phaser.GameObjects.GameObject[],
        /**
         * Optional actions background game object.
         */
        actionsBackground?: Phaser.GameObjects.GameObject,

        proportion?: {
            title?: number,
            content?: number,
            description?: number,
            choices?: number,
            actions?: number,
        },

        expand?: {
            title?: boolean,
            content?: boolean,
            description?: boolean,
            choices?: boolean,
            actions?: boolean,
        },

        align?: {
            title?: AlignTypes,
            content?: AlignTypes,
            description?: AlignTypes,
            choices?: AlignTypes,
            actions?: AlignTypes,
        },

        /**
         * Click behavior configuration.
         */
        click?: IConfigClick
    }

    /**
     * Modal behavior options for the dialog.
     */
    interface IModalConfig extends ModalBehavoir.IConfig {
        /**
         * Set to true to use default close behavior.
         */
        defaultBehavior?: boolean,
    }

    /**
     * Data payload passed when dialog closes.
     */
    interface ICloseEventData {
        /**
         * Selected button index.
         */
        index: number,
        /**
         * Selected button text.
         */
        text: string,
        /**
         * Selected button game object.
         */
        button: Phaser.GameObjects.GameObject,
        /**
         * Dialog instance.
         */
        dialog: Dialog,
        /**
         * Optional custom result value.
         */
        value: any
    }

    /**
     * Callback invoked when modal dialog closes.
     */
    type OnModalCloseCallbackType = (
        /**
         * Close payload or dialog instance.
         */
        data: ICloseEventData | Dialog
    ) => void;
}

/**
 * Composite dialog UI component with title, content, choices, and actions.
 */
declare class Dialog extends Sizer {
    /**
     * Create a dialog component.
     *
     * @param scene - Scene that owns this dialog.
     * @param config - Optional dialog configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: Dialog.IConfig
    );

    /**
     * Emit a choice button click event.
     *
     * @param index - Choice index or choice button.
     * @returns This dialog instance.
     */
    emitChoiceClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Emit an action button click event.
     *
     * @param index - Action index or action button.
     * @returns This dialog instance.
     */
    emitActionClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Emit a toolbar button click event.
     *
     * @param index - Toolbar index or toolbar button.
     * @returns This dialog instance.
     */
    emitToolbarClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Emit a left-toolbar button click event.
     *
     * @param index - Left-toolbar index or button.
     * @returns This dialog instance.
     */
    emitLeftToolbarClick(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Enable or disable a choice button.
     *
     * @param index - Choice index or choice button.
     * @param enable - Target enabled state.
     * @returns This dialog instance.
     */
    setChoiceEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    /**
     * Enable or disable an action button.
     *
     * @param index - Action index or action button.
     * @param enable - Target enabled state.
     * @returns This dialog instance.
     */
    setActionEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    /**
     * Enable or disable a toolbar button.
     *
     * @param index - Toolbar index or button.
     * @param enable - Target enabled state.
     * @returns This dialog instance.
     */
    setToolbarEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    /**
     * Enable or disable a left-toolbar button.
     *
     * @param index - Left-toolbar index or button.
     * @param enable - Target enabled state.
     * @returns This dialog instance.
     */
    setLeftToolbarEnable(
        index: number | Phaser.GameObjects.GameObject,
        enable?: boolean
    ): this;

    /**
     * Toggle enabled state of a choice button.
     *
     * @param index - Choice index or choice button.
     * @returns This dialog instance.
     */
    toggleChoiceEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Toggle enabled state of an action button.
     *
     * @param index - Action index or action button.
     * @returns This dialog instance.
     */
    toggleActionEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Toggle enabled state of a toolbar button.
     *
     * @param index - Toolbar index or button.
     * @returns This dialog instance.
     */
    toggleToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Toggle enabled state of a left-toolbar button.
     *
     * @param index - Left-toolbar index or button.
     * @returns This dialog instance.
     */
    toggleLeftToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Get enabled state of a choice button.
     *
     * @param index - Choice index or choice button.
     * @returns True if enabled.
     */
    getChoiceEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Get enabled state of an action button.
     *
     * @param index - Action index or action button.
     * @returns True if enabled.
     */
    getActionEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Get enabled state of a toolbar button.
     *
     * @param index - Toolbar index or button.
     * @returns True if enabled.
     */
    getToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Get enabled state of a left-toolbar button.
     *
     * @param index - Left-toolbar index or button.
     * @returns True if enabled.
     */
    getLeftToolbarEnable(
        index: number | Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Add a choice button.
     *
     * @param gameObject - Choice button to add.
     * @returns This dialog instance.
     */
    addChoice(gameObject: Phaser.GameObjects.GameObject): this;

    /**
     * Add an action button.
     *
     * @param gameObject - Action button to add.
     * @returns This dialog instance.
     */
    addAction(gameObject: Phaser.GameObjects.GameObject): this;

    /**
     * Add a toolbar button.
     *
     * @param gameObject - Toolbar button to add.
     * @returns This dialog instance.
     */
    addToolbar(gameObject: Phaser.GameObjects.GameObject): this;

    /**
     * Add a left-toolbar button.
     *
     * @param gameObject - Left-toolbar button to add.
     * @returns This dialog instance.
     */
    addLeftToolbar(gameObject: Phaser.GameObjects.GameObject): this;

    /**
     * Remove a choice button.
     *
     * @param index - Choice index or button.
     * @param destroyChild - Set to true to destroy removed button.
     * @returns This dialog instance.
     */
    removeChoice(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove an action button.
     *
     * @param index - Action index or button.
     * @param destroyChild - Set to true to destroy removed button.
     * @returns This dialog instance.
     */
    removeAction(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove a toolbar button.
     *
     * @param index - Toolbar index or button.
     * @param destroyChild - Set to true to destroy removed button.
     * @returns This dialog instance.
     */
    removeToolbar(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Remove a left-toolbar button.
     *
     * @param index - Left-toolbar index or button.
     * @param destroyChild - Set to true to destroy removed button.
     * @returns This dialog instance.
     */
    removeLeftToolbar(
        index: number | Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Clear all choice buttons.
     *
     * @param destroyChild - Set to true to destroy removed buttons.
     * @returns This dialog instance.
     */
    clearChoices(destroyChild?: boolean): this;

    /**
     * Clear all action buttons.
     *
     * @param destroyChild - Set to true to destroy removed buttons.
     * @returns This dialog instance.
     */
    clearActions(destroyChild?: boolean): this;

    /**
     * Clear all toolbar buttons.
     *
     * @param destroyChild - Set to true to destroy removed buttons.
     * @returns This dialog instance.
     */
    clearToolbar(destroyChild?: boolean): this;

    /**
     * Clear all left-toolbar buttons.
     *
     * @param destroyChild - Set to true to destroy removed buttons.
     * @returns This dialog instance.
     */
    clearLeftToolbar(destroyChild?: boolean): this;

    /**
     * Show a choice button.
     *
     * @param index - Choice index or choice button.
     * @returns This dialog instance.
     */
    showChoice(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Show an action button.
     *
     * @param index - Action index or action button.
     * @returns This dialog instance.
     */
    showAction(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Show a toolbar button.
     *
     * @param index - Toolbar index or button.
     * @returns This dialog instance.
     */
    showToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Show a left-toolbar button.
     *
     * @param index - Left-toolbar index or button.
     * @returns This dialog instance.
     */
    showLeftToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Hide a choice button.
     *
     * @param index - Choice index or choice button.
     * @returns This dialog instance.
     */
    hideChoice(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Hide an action button.
     *
     * @param index - Action index or action button.
     * @returns This dialog instance.
     */
    hideAction(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Hide a toolbar button.
     *
     * @param index - Toolbar index or button.
     * @returns This dialog instance.
     */
    hideToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Hide a left-toolbar button.
     *
     * @param index - Left-toolbar index or button.
     * @returns This dialog instance.
     */
    hideLeftToolbar(
        index: number | Phaser.GameObjects.GameObject
    ): this;

    /**
     * Iterate all choice buttons.
     *
     * @param callback - Callback invoked per button.
     * @param scop - Optional callback execution scope.
     * @returns This dialog instance.
     */
    forEachChoice(
        callback: Dialog.EachButtonCallbackType,
        scop?: unknown
    ): this;

    /**
     * Iterate all action buttons.
     *
     * @param callback - Callback invoked per button.
     * @param scop - Optional callback execution scope.
     * @returns This dialog instance.
     */
    forEachAction(
        callback: Dialog.EachButtonCallbackType,
        scop?: unknown
    ): this;

    /**
     * Iterate all toolbar buttons.
     *
     * @param callback - Callback invoked per button.
     * @param scop - Optional callback execution scope.
     * @returns This dialog instance.
     */
    forEachToolbar(
        callback: Dialog.EachButtonCallbackType,
        scop?: unknown
    ): this;

    /**
     * Iterate all left-toolbar buttons.
     *
     * @param callback - Callback invoked per button.
     * @param scop - Optional callback execution scope.
     * @returns This dialog instance.
     */
    forEachLeftToolbar(
        callback: Dialog.EachButtonCallbackType,
        scop?: unknown
    ): this;

    /**
     * Check whether any choice button exists.
     *
     * @returns True if any choice exists.
     */
    hasAnyChoice(): boolean;
    /**
     * Check whether any action button exists.
     *
     * @returns True if any action exists.
     */
    hasAnyAction(): boolean;
    /**
     * Check whether any toolbar button exists.
     *
     * @returns True if any toolbar button exists.
     */
    hasAnyToolbar(): boolean;
    /**
     * Check whether any left-toolbar button exists.
     *
     * @returns True if any left-toolbar button exists.
     */
    hasAnyLeftToolbar(): boolean;

    /**
     * Enable or disable all dialog buttons.
     *
     * @param enable - Target enabled state.
     * @returns This dialog instance.
     */
    setAllButtonsEnable(enable?: boolean): this;

    /**
     * Get state of a named choice button.
     *
     * @param name - Choice button name.
     * @returns Button state.
     */
    getChoicesButtonState(name: string): boolean;
    /**
     * Get states of all choice buttons.
     *
     * @returns Mapping from button names to states.
     */
    getChoicesButtonState(): { [name: string]: boolean };

    /**
     * Get states of all choice buttons.
     *
     * @returns Mapping from button names to states.
     */
    getChoicessButtonStates(): { [name: string]: boolean };

    /**
     * Set state of a named choice button.
     *
     * @param name - Choice button name.
     * @param state - Target button state.
     * @returns This dialog instance.
     */
    setChoicesButtonState(
        name: string,
        state?: boolean
    ): this;

    /**
     * Clear all stored choice button states.
     *
     * @returns This dialog instance.
     */
    clearChoicesButtonStates(): this;

    /**
     * Get selected choice button name.
     *
     * @returns Selected button name.
     */
    getChoicesSelectButtonName(): string;

    /**
     * Open dialog as a modal with optional configuration.
     *
     * @param config - Optional modal configuration.
     * @param onClose - Optional callback invoked on close.
     * @returns This dialog instance.
     */
    modal(
        config?: Dialog.IModalConfig,
        onClose?: Dialog.OnModalCloseCallbackType
    ): this;

    /**
     * Open dialog as a modal with close callback.
     *
     * @param onClose - Optional callback invoked on close.
     * @returns This dialog instance.
     */
    modal(
        onClose?: Dialog.OnModalCloseCallbackType
    ): this;

    /**
     * Open dialog as a modal and return a close promise.
     *
     * @param config - Optional modal configuration.
     * @returns Promise resolved with close payload or dialog.
     */
    modalPromise(
        config?: Dialog.IModalConfig
    ): Promise<Dialog.ICloseEventData | Dialog>;

    /**
     * Close the modal dialog programmatically.
     *
     * @param closeEventData - Optional close payload data.
     * @returns This dialog instance.
     */
    modalClose(closeEventData?: Dialog.ICloseEventData): this;
}
