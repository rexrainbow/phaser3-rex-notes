import CSVToArrayPlugin from '../../plugins/csvtoarray-plugin.js';
import TCRPPlugin from '../../plugins/tcrp-plugin.js';

class ActionKlass {
    constructor(scene) {
        this.scene = scene;
        this.objs = new Map();
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

    preload() {}

    create() {
        var csvString = `0,print,hello
1000,print,world
3000,print,--
3000,print,phaser3`;

        var myCmds = new ActionKlass(this);

        var commands = this.plugins.get('rexCSVToArray').convert(csvString);
        var player = this.plugins.get('rexTCRP').addPlayer(this);
        player
            .load(commands, myCmds, {
                // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
                // dtMode: 0           // 'abs'|'absolute'|0|'inc'|'increment'|1
            })
            .start()
            .on('complete', function () {
                console.log(player.now * 0.001);
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
                key: 'rexCSVToArray',
                plugin: CSVToArrayPlugin,
                start: true
            },
            {
                key: 'rexTCRP',
                plugin: TCRPPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);