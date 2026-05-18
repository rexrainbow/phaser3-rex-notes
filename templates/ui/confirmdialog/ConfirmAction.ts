import ConfirmDialog from './ConfirmDialog';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var ConfirmAction = function(scene?: any, config?: any) {
    var dialog = config.dialog;
    var newDialogMode = !dialog;
    if (newDialogMode?: any) {
        var dialogStyle = config.style;

        if (dialogStyle.buttonMode === undefined) {
            dialogStyle.buttonMode = 2;
        }

        dialog = new ConfirmDialog(scene, dialogStyle, config.creators);
        scene.add.existing(dialog);
    }

    dialog
        .setConfirmButtonIndex(GetValue(config, 'confirmButtonIndex', 0))
        .setCancelButtonIndex(GetValue(config, 'cancelButtonIndex', 1))
        .resetDisplayContent(config.content)
        .layout()

    if (newDialogMode && config.onCreateDialog) {
        config.onCreateDialog(dialog);
    }

    var modalConfig = config.modal;
    if (modalConfig && !modalConfig.hasOwnProperty('destroy')) {
        modalConfig.destroy = newDialogMode;
    }

    var confirmCallback = config.confirm;
    var cancelCallback = config.cancel;
    var confirmScope = config.confirmScope;
    var cancelScope = config.cancelScope;
    var closeCallback = config.close;
    var closeScope = config.closeScope;

    if (confirmCallback?: any) {
        dialog.once('confirm', confirmCallback, confirmScope);
    }
    if (cancelCallback?: any) {
        dialog.once('cancel', cancelCallback, cancelScope);
    }

    var onClose = function(data?: any) {
        if (confirmCallback?: any) {
            dialog.off('confirm', confirmCallback, confirmScope);
        }
        if (cancelCallback?: any) {
            dialog.off('cancel', cancelCallback, cancelScope);
        }

        if (closeCallback?: any) {
            closeCallback.call(closeScope, data);
        }
    }

    dialog.modal(modalConfig, onClose);

    return dialog;
}

export default ConfirmAction;