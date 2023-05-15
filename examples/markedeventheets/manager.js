import phaser from 'phaser/src/phaser.js';
import MarkedEventSheets from '../../plugins/logic/eventsheets/markedeventsheets/MarkedEventSheets.js';
import ManagersBase from '../../plugins/logic/runcommands/managers/Managers.js';
import content from 'raw-loader!/assets/markedeventsheet/manager.md';

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

        this
            .addGameObjectManager({
                name: 'text',
                createGameObject(scene, style) {
                    return scene.add.text(0, 0, '', style);
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

    setSpriteProperty(config) {
        var name = config.name;
        delete config.name;
        for (var prop in config) {
            this.setGameObjectProperty('sprite', name, prop, config[prop]);
        }
        // Execute next command
    }

    easeSpriteProperty(config) {
        var name = config.name;
        delete config.name;

        var duration = config.duration;
        delete config.duration;

        var ease = config.ease;
        delete config.ease;

        var repeat = config.repeat;
        delete config.repeat;

        var isYoyo = config.yoyo;
        delete config.yoyo;

        for (var prop in config) {
            this.easeGameObjectProperty('sprite', name, prop, config[prop], duration, ease, repeat, isYoyo);
        }
        // Execute next command
    }

    getHandler(name, config) {
        var tokens = name.split('.');
        switch (tokens[0]) {
            case 'sprite':
                config.name = tokens[1];
                if (tokens.length === 2) {
                    return this.setSpriteProperty;
                } else if (tokens[2] === 'to') {
                    return this.easeSpriteProperty;
                }

                break;
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
        this.load.image('dude', 'assets/images/phaser-dude.png');
    }

    create() {
        var taskHandlers = new TaskHandlers(this);

        var manager = new MarkedEventSheets({
            taskHandlers: taskHandlers
        });
        manager
            .addEventSheet(content)
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
    scene: Demo
};

var game = new Phaser.Game(config);