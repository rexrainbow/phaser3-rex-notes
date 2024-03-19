import { TEXT, UILayer } from './Const.js';

var RegisterTextboxType = function (commandExecutor) {
    commandExecutor.addGameObjectManager({
        name: TEXT,
        createGameObject: CreateTextBox,
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
                eventSheetManager
            ) {

                if (name) {
                    var title = gameObject.getElement('title').setText(name);
                    gameObject.setChildVisible(title, true);
                } else {
                    var title = gameObject.getElement('title').setText('');
                    gameObject.setChildVisible(title, false);
                }
                gameObject.layout();

                // Wait until typing complete
                commandExecutor.waitEvent(gameObject, 'complete');
                gameObject.start(text, speed);
            },
        }
    })
}

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateTextBox = function (scene, { width = 0, height = 0 } = {}) {
    var wrapWidth = Math.max(0, width - 20);
    var textBox = scene.rexUI.add.textBox({

        innerBackground: scene.rexUI.add.roundRectangle({
            color: COLOR_MAIN, strokeColor: COLOR_LIGHT, strokeWidth: 2, radius: 20,
        }),

        icon: scene.rexUI.add.roundRectangle({ width: 120, height: 120, color: COLOR_DARK }),

        text: scene.add.text(0, 0, '', {
            fontSize: 30,
            wordWrap: {
                width: wrapWidth
            },
            maxLines: 4
        })
            .setFixedSize(width, height),

        action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

        title: scene.rexUI.add.label({
            width: 200,
            background: scene.rexUI.add.roundRectangle({
                radius: { tl: 10, tr: 10 },
                color: COLOR_DARK,
                strokeColor: COLOR_LIGHT, strokeWidth: 2
            }),
            text: scene.add.text(0, 0, '', { fontSize: 36 }),
            align: 'center',
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                icon: 10,
                text: 10,
            },
        }).setVisible(false),

        space: {
            innerLeft: 20, innerRight: 20, innerTop: 20, innerBottom: 20,

            titleLeft: 40,
            icon: 10, text: 10,
        }
    })
        .setOrigin(0.5, 1)
        .layout();

    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
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

            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
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
    //.on('type', function () {
    //})

    return textBox;
}

export default RegisterTextboxType;