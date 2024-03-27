import { CHOICE } from '../const/GameObjects.js';
import { UILayer } from '../const/Layers.js';
import { ConfirmDialog } from '../../ui/ui-components.js'

const GetValue = Phaser.Utils.Objects.GetValue;

var RegisterChoiceDialogType = function (commandExecutor, config) {
    var createGameObjectCallback = GetValue(config, `creators.${CHOICE}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    } else if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${CHOICE}`);
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(style);
    }

    commandExecutor.addGameObjectManager({
        name: CHOICE,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: true,
        defaultLayer: UILayer,

        commands: {
            choice(
                gameObject,
                {
                    title = null,
                    content = null,
                    option1, option2, option3,
                    resultKey = 'choiceIndex'
                } = {},
                commandExecutor,
                eventSheetManager, eventSheet
            ) {

                var choices = [];
                if (option1) { choices.push({ text: option1, value: 1 }); }
                if (option2) { choices.push({ text: option2, value: 2 }); }
                if (option3) { choices.push({ text: option3, value: 3 }); }
                var displayContent = {
                    title: title,
                    content: content,
                    choices: choices,
                }
                gameObject
                    .setVisible(true)
                    .resetDisplayContent(displayContent)
                    .layout();

                commandExecutor.waitEvent(gameObject, 'complete');

                gameObject
                    .modalPromise({ destroy: false })
                    .then(function (data) {
                        eventSheetManager.setData(resultKey, data.value);
                        gameObject.emit('complete');
                    })

            },
        }
    })
}


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

export default RegisterChoiceDialogType;