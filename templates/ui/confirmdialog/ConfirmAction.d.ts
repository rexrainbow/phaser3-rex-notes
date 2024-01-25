import ConfirmDialog from './ConfirmDialog';
import Dialog from '../dialog/Dialog';

export default ConfirmAction;

declare namespace ConfirmAction {
    type ReturnDataType = {
        index: number,
        text: string,
    }

    interface IConfig {
        style: ConfirmDialog.IConfig,
        content: ConfirmDialog.IResetChoiceDisplayContentConfig,
        modal?: Dialog.IModalConfig,

        onCreateDiaog?: (dialog: ConfirmDialog) => void

        acceptButtonIndex?: number,
        accept?: Function,
        acceptScope?: Object,

        rejectButtonIndex?: number,
        reject?: Function,
        rejectScope?: Object,
    }
}

declare function ConfirmAction(
    scene: Phaser.Scene,
    config: ConfirmAction.IConfig
): Promise<ConfirmAction.ReturnDataType>;