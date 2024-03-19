import { CHOICE, UILayer } from './Const.js';

var RegisterChoiceDialogType = function (commandExecutor) {
    commandExecutor.addGameObjectManager({
        name: CHOICE,
        createGameObject: CreateChoiceBox,
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
                eventSheetManager
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

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateChoiceBox = function (scene, { width = 0, height = 0 } = {}) {
    var dialog = scene.rexUI.add.confirmDialog({
        width: width, height: height,
        space: {
            left: 20, right: 20, top: 20, bottom: 20,
            title: 20,
            content: 30,
            choices: 30, choice: 10,
        },

        background: {
            color: COLOR_MAIN,
            strokeColor: COLOR_LIGHT,
            radius: 20,
        },

        title: {
            space: { left: 5, right: 5, top: 5, bottom: 5 },
            text: {
                fontSize: 24
            },
            background: {
                color: COLOR_DARK
            }
        },

        content: {
            space: { left: 5, right: 5, top: 5, bottom: 5 },
            text: {
                fontSize: 20
            },
        },

        choicesType: 'radio',
        choice: {
            space: { left: 10, right: 10, top: 10, bottom: 10 },
            background: {
                color: COLOR_DARK,
                strokeWidth: 0,
                radius: 10,

                'hover.strokeColor': 0xffffff,
                'hover.strokeWidth': 2,
                'active.color': COLOR_LIGHT,
            }
        },

        align: {
            actions: 'right'
        },
    })
        .setVisible(false)

    return dialog;
}

export default RegisterChoiceDialogType;