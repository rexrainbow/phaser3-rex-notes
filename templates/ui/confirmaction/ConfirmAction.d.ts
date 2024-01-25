import ConfirmDialog from '../confirmdialog/ConfirmDialog';
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
        content?: ConfirmDialog.IResetChoiceDisplayContentConfig,
        modal?: Dialog.IModalConfig,

        onCreateDialog?: (dialog: ConfirmDialog) => void,

        accept?: Function,
        acceptScope?: Object,
        acceptButtonIndex?: number,

        reject?: Function,
        rejectScope?: Object,
        rejectButtonIndex?: number,
    }
}

declare function ConfirmAction(
    scene: Phaser.Scene,
    config: ConfirmAction.IConfig
): Promise<ConfirmAction.ReturnDataType>;