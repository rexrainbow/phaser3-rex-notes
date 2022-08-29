import phaser from 'phaser/src/phaser.js';
import CSVScenarioPlugin from '../../plugins/csvscenario-plugin.js';
import Extend from '../../plugins/utils/managers/Extend.js';

var csvString = `\
-,add-sprite,A,dude,,
-,set-sprite-position,A,1,1,,
-,move-sprite,A,0.5,0.5,1000`;

class Managers extends Extend(Phaser.Events.EventEmitter) {
    constructor(scene) {
        super();

        this.initManagers({
            scene: scene
        })

        this.addGameObjectManager({
            name: 'sprite',
            createGameObject(scene, key, frame) {
                return scene.add.sprite(0, 0, key, frame);
            },
            viewportCoordinate: true,
        })
    }

    destroy() {
        this.destroyManagers();
    }

    ['add-sprite'](name, key, frame) {
        this.createGameObject('sprite', name, key, frame);
        // Execute next command
    }

    ['remove-sprite'](name) {
        this.destroyGameObject('sprite', name);
        // Execute next command
    }

    ['call-sprite-method'](name, methodName, ...params) {
        this.setGameObjectProperty('sprite', name, methodName, ...params);
        // Execute next command
    }

    ['set-sprite-prop'](name, prop, value) {
        this.setGameObjectProperty('sprite', name, prop, value);
        // Execute next command
    }

    ['set-sprite-position'](name, x, y) {
        this.setGameObjectProperty('sprite', name, 'vpx', x);
        this.setGameObjectProperty('sprite', name, 'vpy', y);
        // Execute next command
    }

    ['ease-sprite-prop'](name, prop, value, duration, ease, repeat, isYoyo) {
        this.easeGameObjectProperty('sprite', name, prop, value, duration, ease, repeat, isYoyo);
        // Execute next command
    }

    ['move-sprite'](name, x, y, duration, ease, isYoyo) {
        this.easeGameObjectProperty('sprite', name, 'vpx', x, duration, ease, 0, isYoyo);
        this.easeGameObjectProperty('sprite', name, 'vpy', y, duration, ease, 0, isYoyo);
        // Execute next command
    }

    complete() {
        this.emit('complete');
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
        var managers = new Managers(this);
        var scenario = this.plugins.get('rexCSVScenario').add(this)
            .on('complete', function () {
                console.log('scenario complete')
            })
            .load(csvString, managers, {
                timeUnit: 'sec'
            })
            .start();
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
            key: 'rexCSVScenario',
            plugin: CSVScenarioPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);