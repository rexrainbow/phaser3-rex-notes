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
        this.load.text('eventSheet0', 'assets/markedeventsheet/command-executor.md');
        this.load.image('nextPage', 'assets/images/arrow-down-left.png');
        this.load.image('mushroom', 'assets/images/mushroom.png');

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
        var eventSheetManager = this.plugins.get('rexMarkedEventSheets').add({
            commandExecutor: CreateCommandExecutor(this)
        })
            .addEventSheet(this.cache.text.get('eventSheet0'))

        this.input.once('pointerdown', function () {
            eventSheetManager.start()
        })

        this.add.text(0, 580, 'Any click to start')
    }

    update() { }
}

var CreateCommandExecutor = function (scene) {
    var commandExecutor = scene.plugins.get('rexMarkedEventSheets').addCommandExecutor(scene)
        .addGameObjectManager({
            name: 'text',
            createGameObject: CreateTextBox,
            viewportCoordinate: true,

            commands: {
                typing(gameObject, { text, speed } = {}, commandExecutor) {
                    // Wait until typing complete
                    commandExecutor.waitEvent(gameObject, 'complete');
                    gameObject.start(text, speed);
                }
            }
        })
        .addGameObjectManager({
            name: 'sprite',
            createGameObject(scene, { key, frame } = {}) {
                return scene.add.sprite(0, 0, key, frame);
            },
            viewportCoordinate: true,
        })

    return commandExecutor;
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateTextBox = function (scene, { width = 0, height = 0 } = {}) {
    var wrapWidth = Math.max(0, width - 20);
    var textBox = scene.rexUI.add.textBox({
        background: scene.rexUI.add.roundRectangle({
            color: COLOR_PRIMARY, strokeColor: COLOR_LIGHT, strokeWidth: 2, radius: 20,
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

        space: {
            left: 20, right: 20, top: 20, bottom: 20,
            icon: 10,
            text: 10,
        }
    })
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