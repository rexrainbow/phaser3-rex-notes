import { TEXT } from '../const/GameObjects.js';
import { UILayer } from '../const/Layers.js';
import { SimpleTextBox } from '../../ui/ui-components.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RegisterTextboxType = function (commandExecutor, config) {
    var createGameObjectCallback = GetValue(config, `creators.${TEXT}`, undefined);
    if (createGameObjectCallback === false) {
        return;
    } else if (createGameObjectCallback === undefined) {
        var style = GetValue(config, `styles.${TEXT}`);
        createGameObjectCallback = GenerateDefaultCreateGameObjectCallback(style);
    }

    commandExecutor.addGameObjectManager({
        name: TEXT,
        createGameObject: createGameObjectCallback,
        fade: 0,  // No fade-in when creating/destroying gameobject
        viewportCoordinate: true,
        defaultLayer: UILayer,

        commands: {
            typing(
                gameObject,
                {
                    name,
                    text,
                    speed
                } = {},
                commandExecutor,
                eventSheetManager, eventSheet
            ) {

                if (name) {
                    var title = gameObject.getElement('title').setText(name);
                    gameObject.setChildAlpha(title, 1);
                } else {
                    var title = gameObject.getElement('title').setText('');
                    gameObject.setChildAlpha(title, 0);
                }
                gameObject.layout();

                // Wait until typing complete
                commandExecutor.waitEvent(gameObject, 'complete');
                gameObject.start(text, speed);
            },
        }
    })
}

var GenerateDefaultCreateGameObjectCallback = function (style = {}) {
    return function (
        scene,
        {
            width = 0,
            height = 0
        } = {}
    ) {
        var wrapWidth = Math.max(0, width - 20);

        SetValue(style, 'text.fixedWidth', width);
        SetValue(style, 'text.fixedHeight', height);
        SetValue(style, 'text.wordWrap.width', wrapWidth)

        var textBox = new SimpleTextBox(scene, style);

        textBox
            .setMinSize(width, height)
            .setOrigin(0.5, 1)
            .layout();

        scene.add.existing(textBox);

        textBox
            .setInteractive()
            .on('pointerdown', function () {
                var icon = this.getElement('action');
                this.setChildAlpha(icon, 0);
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
            }, textBox)
            .on('pageend', function () {
                if (this.isLastPage) {
                    return;
                }

                var icon = this.getElement('action');
                this.setChildAlpha(icon, 1);
                icon.y -= 30;
                var tween = scene.tweens.add({
                    targets: icon,
                    y: '+=30', // '+=100'
                    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 500,
                    repeat: 0, // -1: infinity
                    yoyo: false
                });
            }, textBox)

        return textBox;
    }
}

export default RegisterTextboxType;