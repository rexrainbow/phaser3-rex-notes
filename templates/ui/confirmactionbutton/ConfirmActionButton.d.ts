// import * as Phaser from 'phaser';
import Label from '../label/Label';
import ConfirmAction from '../confirmdialog/ConfirmAction';
import ConfirmDialog from '../confirmdialog/ConfirmDialog';
import Dialog from '../dialog/Dialog';


export default ConfirmActionButton;

declare namespace ConfirmActionButton {

    /**
     * Configuration options for creating a confirm-action button.
     */
    interface IConfig extends Label.IConfig {
        /**
         * Confirm dialog configuration.
         */
        confirmDialog: ConfirmAction.IConfig,

        /**
         * Confirm callback function.
         */
        confirm?: Function,
        /**
         * Scope used when invoking confirm callback.
         */
        confirmScope?: Object,

        /**
         * Cancel callback function.
         */
        cancel?: Function,
        /**
         * Scope used when invoking cancel callback.
         */
        cancelScope?: Object,
    }
}

/**
 * Label button that opens a confirm dialog before executing actions.
 */
declare class ConfirmActionButton extends Label {
    /**
     * Create a confirm-action button.
     *
     * @param scene - Scene that owns this button.
     * @param config - Optional button and confirm-dialog configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ConfirmActionButton.IConfig
    );

    /**
     * Set confirm dialog display content.
     *
     * @param content - Confirm dialog content configuration.
     * @returns This button instance.
     */
    setConfirmDialogContent(
        content: ConfirmDialog.IResetDisplayContentConfig
    ): this;

    /**
     * Set confirm dialog style configuration.
     *
     * @param style - Confirm dialog style configuration.
     * @returns This button instance.
     */
    setConfirmDialogStyle(
        style: ConfirmDialog.IConfig
    ): this;

    /**
     * Set confirm dialog modal configuration.
     *
     * @param config - Modal behavior configuration.
     * @returns This button instance.
     */
    setConfirmDialogModalConfig(
        config: Dialog.IModalConfig
    ): this;

    /**
     * Set confirm callback.
     *
     * @param callback - Confirm callback function.
     * @param scope - Optional callback execution scope.
     * @returns This button instance.
     */
    setConfirmCallback(
        callback?: Function,
        scope?: Object
    ): this;

    /**
     * Set cancel callback.
     *
     * @param callback - Cancel callback function.
     * @param scope - Optional callback execution scope.
     * @returns This button instance.
     */
    setCancelCallback(
        callback?: Function,
        scope?: Object
    ): this;

    /**
     * Enable or disable confirm dialog behavior.
     *
     * @param enable - True to enable confirm dialog behavior.
     * @returns This button instance.
     */
    setConfirmDialogEnable(enable?: boolean): this;
    /**
     * Current confirm-dialog enabled state.
     */
    confirmDialogEnable: boolean;

    /**
     * Run confirm callback directly.
     *
     * @returns This button instance.
     */
    runConfirmCallback(): this;

}
