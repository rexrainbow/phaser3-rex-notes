import phaser from 'phaser/src/phaser.js';
import MarkedEventSheetsPlugin from '../../plugins/markedeventsheets-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class TaskHandlers {
    constructor(scene, config) {
        this.sys = new RexPlugins.TaskHandlers(scene, config);

        this.sys
            .addGameObjectManager({
                name: 'text',
                createGameObject: CreateTextBox,
                viewportCoordinate: true,
            })
            .addGameObjectManager({
                name: 'sprite',
                createGameObject(scene, key, frame) {
                    return scene.add.sprite(0, 0, key, frame);
                },
                viewportCoordinate: true,
            })

    }

    destroy(fromScene) {
        this.sys.destroy(fromScene);
    }

    set(config, manager) {
        for (var name in config) {
            var value = manager.evalExpression(config[name]);
            manager.setData(name, value);
        }
    }

    text({ name, width, height, vpx = 0.5, vpy = 0.5 } = {}, manager) {
        this.sys.createGameObject('text', name, width - 20, width, height);
        var gameObject = this.sys.getGameObject('text', name);
        gameObject.vpx = vpx;
        gameObject.vpy = vpy;
        // Execute next command
    }

    textTyping({ name, text, speed } = {}, manager) {
        var textBox = this.sys.getGameObject('text', name);
        this.sys.waitEventManager.waitEvent(textBox, 'complete');
        textBox.start(text, speed);

        return this.sys;
        // Wait until typing complete
    }

    sprite({ name, key, frame, vpx = 0.5, vpy = 0.5 } = {}, manager) {
        this.sys.createGameObject('sprite', name, key, frame);
        var gameObject = this.sys.getGameObject('sprite', name);
        gameObject.vpx = vpx;
        gameObject.vpy = vpy;
        // Execute next command
    }

    _setGOProperty(config, manager) {
        var { name } = config;
        delete config.name;
        for (var prop in config) {
            var value = manager.evalExpression(config[prop]);
            this.sys.setGameObjectProperty(undefined, name, prop, value);
        }
        // Execute next command
    }

    _easeGOProperty(config, manager) {
        var { name, duration, ease, repeat, yoyo, wait = true } = config;
        delete config.name;
        delete config.duration;
        delete config.ease;
        delete config.repeat;
        delete config.yoyo;
        delete config.wait;

        var waitProperty;
        for (var prop in config) {
            var value = manager.evalExpression(config[prop]);
            this.sys.easeGameObjectProperty(undefined, name, prop, value, duration, ease, repeat, yoyo);
            waitProperty = prop;
        }
        if (wait && waitProperty) {
            return this.sys.waitEventManager.waitGameObjectTweenComplete(undefined, name, waitProperty);
        }

        // Execute next command
    }

    wait(config, manager) {
        var { time } = config;
        if (time !== undefined) {
            config.time = manager.evalExpression(time);
        }
        return this.sys.waitEventManager.waitAny(config);
    }

    click(config, manager) {
        return this.wait({ click: true }, manager);
    }

    getHandler(name, config, manager) {
        var tokens = name.split('.');

        config.name = tokens[0];
        switch (tokens.length) {
            case 1:
                var gameObjectType = this.sys.getGameObjectManagerName(config.name);
                if ((gameObjectType === 'text') && (config.text)) {
                    return this.textTyping;
                } else {
                    return this._setGOProperty;
                }

            case 2:
                switch (tokens[1]) {
                    case 'to':
                        return this._easeGOProperty;

                    case 'yoyo':
                        config.yoyo = true;
                        return this._easeGOProperty;

                    default:
                        debugger;
                        // TODO:
                        config.methodName = tokens[1];
                        return this._runGOMethod;
                }
        }
    }

}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateTextBox = function (scene, wrapWidth, width, height) {
    if (width === undefined) {
        width = 0;
    }
    if (height === undefined) {
        height = 0;
    }
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

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.text('eventSheet0', 'assets/markedeventsheet/manager.md');
        this.load.image('nextPage', 'assets/images/arrow-down-left.png');
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var taskHandlers = new TaskHandlers(this);

        var eventSheetManager = this.plugins.get('rexMarkedEventSheets').add({
            taskHandlers: taskHandlers
        })
            .addEventSheet(this.cache.text.get('eventSheet0'))
            .start()

    }

    update() { }
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