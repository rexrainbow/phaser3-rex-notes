import CSVScenarioPlugin from '../../plugins/csvscenario-plugin.js';

var csvString =
    `-,print,hello
1,print,world
1,print,scenario
#label,AA,
-,print,rex
1,print,next
#label,BB,
-,print,phaser
1,print,next
#exit,,
-,print,last`;

class ActionKlass extends Phaser.Events.EventEmitter {
    constructor(scene) {
        super();

        this.scene = scene;
    }

    // callbacks
    print(msg) {
        console.log(msg);
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
            .on('labelchange', function (curLabel, prevLabel) {
                console.log('Label: "' + prevLabel + '"->"' + curLabel + '"')
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