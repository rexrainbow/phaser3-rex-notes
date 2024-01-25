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
        .resetDisplayContent(config.content)
        .layout()

    if (newDialogMode && config.onCreateDialog) {
        config.onCreateDialog(dialog);
    }

    var modalConfig = config.modal;
    if (modalConfig && !modalConfig.hasOwnProperty('destroy')) {
        modalConfig.destroy = newDialogMode;
    }

    var acceptButtonIndex = GetValue(config, 'acceptButtonIndex', 0);
    var rejectButtonIndex = GetValue(config, 'rejectButtonIndex', 1);
    var acceptCallback = config.accept;
    var rejectCallback = config.reject;
    var acceptScope = config.acceptScope;
    var rejectScope = config.rejectScope;

    var onClose = function (data) {
        var buttonIndex = data.index;
        if (buttonIndex === acceptButtonIndex) {
            if (acceptCallback) {
                acceptCallback.call(acceptScope);
            }
        } else if (buttonIndex === rejectButtonIndex) {
            if (rejectCallback) {
                rejectCallback.call(rejectScope);
            }
        }

        return {
            index: data.index,
            text: data.text
        }
    }
    dialog.modal(modalConfig, onClose);

    return dialog;
}

export default ConfirmAction;