import ConfirmDialog from './ConfirmDialog';
import Dialog from '../dialog/Dialog';

export default ConfirmAction;

declare namespace ConfirmAction {
    type ReturnDataType = {
        index: number,
        text: string,
    }

    interface IConfig {
        dialog?: ConfirmDialog,
        style?: ConfirmDialog.IConfig,
        content?: ConfirmDialog.IResetDisplayContentConfig,
        modal?: Dialog.IModalConfig,
        onCreateDialog?: (dialog: ConfirmDialog) => void,

        confirm?: Function,
        confirmScope?: Object,
        confirmButtonIndex?: number,

        cancel?: Function,
        cancelScope?: Object,
        cancelButtonIndex?: number,
    }
}

declare function ConfirmAction(
    scene: Phaser.Scene,
    config: ConfirmAction.IConfig
): ConfirmDialog;