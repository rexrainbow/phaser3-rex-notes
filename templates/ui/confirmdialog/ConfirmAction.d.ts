import ConfirmDialog from './ConfirmDialog';
import Dialog from '../dialog/Dialog';

export default ConfirmAction;

declare namespace ConfirmAction {
    /**
     * Return data from a confirm action result.
     */
    type ReturnDataType = {
        /**
         * Index of the clicked button.
         */
        index: number,
        /**
         * Text of the clicked button.
         */
        text: string,
    };

    /**
     * Callback invoked when a confirm dialog is created.
     */
    type OnCreateDialogCallbackType = (
        /**
         * Created confirm dialog instance.
         */
        dialog: ConfirmDialog
    ) => void;

    /**
     * Configuration options for running a confirm action.
     */
    interface IConfig {
        /**
         * Existing dialog instance to reuse.
         */
        dialog?: ConfirmDialog,
        /**
         * Dialog style configuration used when creating a new dialog.
         */
        style?: ConfirmDialog.IConfig,
        /**
         * Content reset configuration applied before showing.
         */
        content?: ConfirmDialog.IResetDisplayContentConfig,
        /**
         * Modal behavior configuration.
         */
        modal?: Dialog.IModalConfig,
        /**
         * Callback invoked when dialog is created.
         */
        onCreateDialog?: OnCreateDialogCallbackType,

        /**
         * Confirm callback function.
         */
        confirm?: Function,
        /**
         * Scope used when calling confirm callback.
         */
        confirmScope?: Object,
        /**
         * Index treated as confirm button.
         */
        confirmButtonIndex?: number,

        /**
         * Cancel callback function.
         */
        cancel?: Function,
        /**
         * Scope used when calling cancel callback.
         */
        cancelScope?: Object,
        /**
         * Index treated as cancel button.
         */
        cancelButtonIndex?: number,
    }
}

/**
 * Show a confirm dialog and wire confirm/cancel callbacks.
 *
 * @param scene - Scene used to create and show dialog.
 * @param config - Confirm action configuration.
 * @returns Confirm dialog instance.
 */
declare function ConfirmAction(
    scene: Phaser.Scene,
    config: ConfirmAction.IConfig
): ConfirmDialog;
