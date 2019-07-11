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
        var myCmds = new ActionKlass(this);
        var commands = [
            ['// ??'],               // [NaN, ...] -> ignored
            [0, 'print', 'hello'],        // [dt, fnName, param0, param1, ...]
            [1000, ['print', 'world']],   // [dt, [fnName, param0, param1, ...]]
            [3000, [                      // [dt, [command0, command1, ...]]
                ['print', '--'],
                ['print', 'phaser3'],
            ]]
        ];
        var player = this.plugins.get('rexTCRP').addPlayer(this);
        player
            .load(commands, myCmds, {
                // timeUnit: 0,        // 'ms'|0|'s'|'sec'|1
                // dtMode: 0           // 'abs'|'absolute'|0|'inc'|'increment'|1
            })
            .start()
            .on('complete', function(){
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
            key: 'rexTCRP',
            plugin: TCRPPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);