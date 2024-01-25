import ConfirmDialog from '../confirmdialog/ConfirmDialog.js';

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
    if (modalConfig) {
        modalConfig.destroy = newDialogMode;
    }

    return dialog
        .modalPromise(modalConfig)
        .then(function (data) {
            var buttonIndex = data.index;
            var acceptButtonIndex = GetValue(config, 'acceptButtonIndex', 0);
            var rejectButtonIndex = GetValue(config, 'rejectButtonIndex', 1);
            var acceptCallback = config.accept;
            var rejectCallback = config.reject;

            if (buttonIndex === acceptButtonIndex) {
                if (acceptCallback) {
                    acceptCallback.call(config.acceptScope);
                }
            } else if (buttonIndex === rejectButtonIndex) {
                if (rejectCallback) {
                    rejectCallback.call(config.rejectScope);
                }
            }

            return {
                index: data.index,
                text: data.text
            }
        })

}

export default ConfirmAction;