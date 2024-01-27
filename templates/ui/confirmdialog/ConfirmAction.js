import ConfirmDialog from './ConfirmDialog.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var ConfirmAction = function (scene, config) {
    var dialog = config.dialog;
    var newDialogMode = !dialog;
    if (newDialogMode) {
        var dialogStyle = config.style;
        dialogStyle.buttonMode = 2;

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

    if (confirmCallback) {
        dialog.once('confirm', confirmCallback, confirmScope);
    }
    if (cancelCallback) {
        dialog.once('cancel', cancelCallback, cancelScope);
    }

    var onClose = function (data) {
        dialog.off('confirm', confirmCallback, confirmScope);
        dialog.off('cancel', cancelCallback, cancelScope);
    }

    dialog.modal(modalConfig, onClose);

    return dialog;
}

export default ConfirmAction;