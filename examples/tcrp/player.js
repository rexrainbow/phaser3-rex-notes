'use strict'

import TCRPPlugin from './../../plugins/tcrp-plugin.js';

const PlayerPlugin = TCRPPlugin.Player;


class CmdKlass {
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
        var myCmds = new CmdKlass(this);
        var commands = [
            [0, 'print', 'hello'],        // [dt, fnName, param0, param1, ...]
            [1000, ['print', 'world']],   // [dt, [fnName, param0, param1, ...]]
            [3000, [                      // [dt, [command0, command1, ...]]
                ['print', '--'],
                ['print', 'phaser3'],
            ]]
        ];
        var player = new PlayerPlugin(this);
        player
            .load(commands, myCmds)
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
    scene: Demo
};

var game = new Phaser.Game(config);