import CSVScenarioPlugin from '../../plugins/csvscenario-plugin.js';

var csvString =
    `-,print,start
#LABEL,AA,
-,print,hello
1,print,world
#WAIT,1,
#GOTO,AA,`;

class ActionKlass extends Phaser.Events.EventEmitter {
    constructor(scene) {
        super();
        this.scene = scene;
    }

    // callbacks
    print(s) {
        console.log(s);
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

        this.input.on('pointerup', function () {
            scenario.continue('click');
        });

        scenario
            .on('complete', function () {
                console.log('scenario complete')
            })
            .on('log', function (msg) {
                console.log(msg)
            })
            .load(csvString, myCmds, {
                timeUnit: 'sec'
            })
            .start({
                label: 'AA'
            });
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