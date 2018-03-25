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
            [0, 'print', 'hello'],
            [2000, 'print', 'world']
        ];
        var player = new PlayerPlugin(this);
        player.load(commands, myCmds).start();
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