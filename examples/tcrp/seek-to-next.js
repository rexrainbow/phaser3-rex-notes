import phaser from 'phaser/src/phaser.js';
import CSVToArrayPlugin from '../../plugins/csvtoarray-plugin.js';
import TCRPPlugin from '../../plugins/tcrp-plugin.js';

class ActionKlass {
    constructor(scene) {
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

    preload() { }

    create() {
        var csvString = `0,print,hello
5,print,world`;

        var myCmds = new ActionKlass(this);

        var commands = this.plugins.get('rexCSVToArray').convert(csvString);
        var player = this.plugins.get('rexTCRP').addPlayer(this);
        player
            .load(commands, myCmds, {
                timeUnit: 's',        // 'ms'|0|'s'|'sec'|1
            })
            .start()
            .on('complete', function () {
                console.log(player.now * 0.001);
                player.seekToNext(); // Do nothing
            });
        
        player.seekToNext();
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