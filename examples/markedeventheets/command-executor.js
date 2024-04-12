import phaser from 'phaser/src/phaser.js';
import MarkedEventSheetsPlugin from '../../plugins/markedeventsheets-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.text('eventSheet0', 'assets/markedeventsheet/command-executor/command-executor.md');

        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');

        this.load.image('nextPage', 'assets/images/arrow-down-left.png');

        this.load.atlas('characters', 'assets/images/characters/characters.png', 'assets/images/characters/characters.json');
        this.load.atlas('portraits', 'assets/images/characters/portraits.png', 'assets/images/characters/portraits.json');

        this.load.audio('theme0', [
            'assets/audio/oedipus_wizball_highscore.ogg',
            'assets/audio/oedipus_wizball_highscore.mp3'
        ]);
        this.load.audio('theme1', [
            'assets/audio/jungle.ogg',
            'assets/audio/jungle.mp3'
        ]);
        this.load.audio('explosion', [
            'assets/audio/soundeffect/explosion.mp3'
        ]);
    }

    create() {
        var print = this.add.text(0, 570, '', { fontSize: 20, backgroundColor: 'grey' }).setDepth(100);
        print.text = 'Any click to start';

        var eventSheetManager = this.plugins.get('rexMarkedEventSheets').add({
            commandExecutor: CreateCommandExecutor(this)
        })
            .addEventSheet(this.cache.text.get('eventSheet0'))

        eventSheetManager
            .on('pause.input', function () {
                print.text = 'Wait any click to continue';
            })
            .on('resume.input', function () {
                print.text = '';
            })
            .on('complete', function () {
                print.text = 'Complete';
                console.log(eventSheetManager.memory)
            })

        this.input.once('pointerdown', function () {
            print.text = '';
            eventSheetManager.start();
        })

    }

    update() { }
}

var CreateCommandExecutor = function (scene) {
    var commandExecutor = scene.plugins.get('rexMarkedEventSheets').addCommandExecutor(scene, {
        layers: ['bgLayer', 'gameLayer', 'uiLayer']
    })
        .addGameObjectManager({
            name: 'SPRITE',
            createGameObject(scene, config) {
                var { name, expression } = config;
                if (name && expression) {
                    config.frame = `${name}-${expression}`;
                }
                return scene.rexUI.add.transitionImagePack(config)
                    .setOrigin(0.5, 1)
            },
            fade: 0,  // No fade-in when creating/destroying gameobject
            viewportCoordinate: true,
            defaultLayer: 'gameLayer',

            commands: {
                cross(
                    gameObject,
                    {
                        key, frame,
                        name, expression,
                        duration, mode = 'crossFade',
                        wait = true
                    } = {},
                    commandExecutor, eventSheetManager, eventSheet
                ) {

                    if (!key) {
                        key = gameObject.texture.key;
                    }

                    if (name || expression) {
                        var tokens = gameObject.frame.name.split('-');
                        name = name || tokens[0];
                        expression = expression || tokens[1];
                        frame = `${name}-${expression}`;
                    }

                    // Wait until transition complete
                    if (wait) {
                        commandExecutor.waitEvent(gameObject, 'complete');
                    }

                    var durationSave = gameObject.duration;
                    if (duration !== undefined) {
                        gameObject.setDuration(duration);
                    }
                    gameObject.transit(key, frame, mode);
                    gameObject.setDuration(durationSave);

                },

                focus(
                    gameObject,
                    {
                        tintOthers = 0x000000,
                    } = {},
                    commandExecutor, eventSheetManager, eventSheet
                ) {

                    gameObject.bringMeToTop();
                    commandExecutor.setGOProperty(
                        {
                            goType: 'SPRITE',
                            id: '!' + gameObject.name,
                            tint: tintOthers,
                        },
                        eventSheetManager
                    )
                },

                unfocus(
                    gameObject,
                    config,
                    commandExecutor, eventSheetManager, eventSheet
                ) {

                    commandExecutor.setGOProperty(
                        {
                            goType: 'SPRITE',
                            tint: 0xffffff,
                        },
                        eventSheetManager
                    )
                },
            },

        })
        .addGameObjectManager({
            name: 'BG',
            createGameObject(scene, config) {
                return scene.rexUI.add.transitionImagePack(config);
            },
            fade: 0,  // No fade-in when creating/destroying gameobject
            viewportCoordinate: true,
            defaultLayer: 'bgLayer',

            commands: {
                cross(
                    gameObject,
                    {
                        key, frame,
                        duration, mode = 'fade',
                        wait = true
                    } = {},
                    commandExecutor, eventSheetManager, eventSheet
                ) {

                    // Wait until transition complete
                    if (wait) {
                        commandExecutor.waitEvent(gameObject, 'complete');
                    }

                    var durationSave = gameObject.duration;
                    if (duration !== undefined) {
                        gameObject.setDuration(duration);
                    }
                    gameObject.transit(key, frame, mode);
                    gameObject.setDuration(durationSave);
                }
            }
        })
        .addGameObjectManager({
            name: 'TEXTBOX',
            createGameObject: CreateTextBox,
            fade: 0,  // No fade-in when creating/destroying gameobject
            viewportCoordinate: true,
            defaultLayer: 'uiLayer',

            commands: {
                typing(
                    gameObject,
                    {
                        text,
                        name,
                        icon, iconFrame,
                        expression,
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

                    if (expression) {
                        var frameDelimiter = gameObject.frameDelimiter;
                        iconFrame = name + frameDelimiter + expression;
                    }

                    if (icon || iconFrame) {
                        var iconGameObject = gameObject.getElement('icon');
                        if (!icon) {
                            icon = iconGameObject.texture.key;
                        }
                        iconGameObject.setTexture(icon, iconFrame);
                    }
                    gameObject.layout();

                    // Wait until typing complete
                    commandExecutor.waitEvent(gameObject, 'complete');
                    gameObject.start(text, speed);
                },
            }
        })
        .addGameObjectManager({
            name: 'CHOICE',
            createGameObject: CreateChoiceBox,
            fade: 0,  // No fade-in when creating/destroying gameobject
            viewportCoordinate: true,
            defaultLayer: 'uiLayer',

            commands: {
                choice(
                    gameObject,
                    {
                        title = null,
                        content = null,
                        option1, option2, option3,
                        resultKey = 'choiceIndex'
                    } = {},
                    commandExecutor, eventSheetManager
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

    return commandExecutor;
}

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateTextBox = function (
    scene,
    {
        width = 0, height = 0
    } = {}
) {

    var wrapWidth = Math.max(0, width - 20);
    var textBox = scene.rexUI.add.textBox({

        innerBackground: scene.rexUI.add.roundRectangle({
            color: COLOR_MAIN, strokeColor: COLOR_LIGHT, strokeWidth: 2, radius: 20,
        }),

        icon: scene.add.image(0, 0, '__WHITE'),
        iconWidth: 120, iconHeight: 120,

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

var CreateChoiceBox = function (
    scene,
    {
        width = 0, height = 0
    } = {}
) {

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
            wrapText: 'word',
            background: {
                color: COLOR_DARK
            }
        },

        content: {
            space: { left: 5, right: 5, top: 5, bottom: 5 },
            wrapText: 'word',
            text: {
                fontSize: 20
            },
        },

        choicesType: 'radio',
        choice: {
            space: { left: 10, right: 10, top: 10, bottom: 10 },
            wrapText: 'word',
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

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexMarkedEventSheets',
            plugin: MarkedEventSheetsPlugin,
            start: true
        }],
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);