// import * as Phaser from 'phaser';
import Label from '../label/Label';
import ConfirmAction from '../confirmdialog/ConfirmAction';
import ConfirmDialog from '../confirmdialog/ConfirmDialog';
import Dialog from '../dialog/Dialog';


export default ConfirmActionButton;

declare namespace ConfirmActionButton {

    interface IConfig extends Label.IConfig {
        confirmDialog: ConfirmAction.IConfig,

        accept?: Function,
        acceptScope?: Object,

        reject?: Function,
        rejectScope?: Object,
    }
}

declare class ConfirmActionButton extends Label {
    constructor(
        scene: Phaser.Scene,
        config?: ConfirmActionButton.IConfig
    );

    setConfirmDialogContent(
        content: ConfirmDialog.IResetDisplayContentConfig
    ): this;

    setConfitmDialogStyle(
        style: ConfirmDialog.IConfig
    ): this;

    setConfitmDialogModalConfig(
        config: Dialog.IModalConfig
    ): this;

    setAcceptCallback(
        callback?: Function,
        scope?: Object
    ): this;

    setRejectCallback(
        callback?: Function,
        scope?: Object
    ): this;

    setConfirmDialogEnable(enable?: boolean): this;
    confirmDialogEnable: boolean;

    runAcceptCallback(): this;

}