import phaser from 'phaser/src/phaser.js';
import MarkedEventSheetsPlugin from '../../plugins/markedeventsheets-plugin.js';
import ManagersBase from '../../plugins/logic/runcommands/managers/Managers.js';

class TaskHandlers extends ManagersBase {
    constructor(scene) {
        super(scene);

        this
            .addGameObjectManager({
                name: 'sprite',
                createGameObject(scene, key, frame) {
                    return scene.add.sprite(0, 0, key, frame);
                },
                viewportCoordinate: true,
            })
    }

    complete() {
        this.emit('complete');
        return this;
    }

    sprite({ name, key, frame } = {}) {
        this.createGameObject('sprite', name, key, frame);
        // Execute next command
    }

    setGOProperty(config) {
        var name = config.name;
        delete config.name;
        for (var prop in config) {
            this.setGameObjectProperty(undefined, name, prop, config[prop]);
        }
        // Execute next command
    }

    easeGOProperty(config) {
        var { name, duration, ease, repeat, yoyo } = config;
        delete config.name;
        delete config.duration;
        delete config.ease;
        delete config.repeat;
        delete config.yoyo;

        for (var prop in config) {
            this.easeGameObjectProperty(undefined, name, prop, config[prop], duration, ease, repeat, yoyo);
        }
        // Execute next command
    }

    runGOMethod(config) {
        // TODO
    }

    getHandler(name, config) {
        var tokens = name.split('.');

        config.name = tokens[0];
        if (tokens.length === 1) {
            return this.setGOProperty;
        } else if (tokens[1] === 'to') {
            return this.easeGOProperty;
        } else if (tokens[1] === 'yoyo') {
            config.yoyo = true;
            return this.easeGOProperty;
        } else {
            config.methodName = tokens[1];
            return this.runGOMethod;
        }
    }

}

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.text('eventSheet0', 'assets/markedeventsheet/manager.md');
        this.load.image('dude', 'assets/images/phaser-dude.png');
    }

    create() {
        var taskHandlers = new TaskHandlers(this);

        var manager = this.plugins.get('rexMarkedEventSheets').add({
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
        }]
    }
};

var game = new Phaser.Game(config);