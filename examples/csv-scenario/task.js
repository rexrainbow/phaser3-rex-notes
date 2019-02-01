import CSVScenarioPlugin from '../../plugins/csvscenario-plugin.js';

var csvString =
    `-,print,hello
-,print,world
-,print,scenario`;

class ActionKlass extends Phaser.Events.EventEmitter {
    constructor(scene) {
        super();
        this.scene = scene;
    }

    // callbacks
    print(s) {
        console.log(s);
        this.waitClick();
        return this; // pause
    }

    waitClick() {
        this.scene.input.once('pointerup', this.complete, this); // resume
        return this;
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

    }

    create() {
        var scenario = this.plugins.get('rexCSVScenario').add(this);
        var myCmds = new ActionKlass(this);
        scenario
            .on('complete', function () {
                console.log('scenario complete')
            })
            .load(csvString, myCmds, {
                timeUnit: 'sec'
            })
            .start();
    }

    update() {}
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