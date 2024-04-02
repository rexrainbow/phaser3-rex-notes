import { ConfirmDialog } from '../../../ui/ui-components.js'

var GenerateDefaultCreateGameObjectCallback = function (style) {
    return function (
        scene,
        {
            width = 0,
            height = 0
        } = {}
    ) {
        var dialog = new ConfirmDialog(scene, style);

        dialog
            .setMinSize(width, height)
            .setVisible(false)

        scene.add.existing(dialog);

        return dialog;
    }
}

export default GenerateDefaultCreateGameObjectCallback;