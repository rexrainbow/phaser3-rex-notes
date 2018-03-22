'use strict'

import runCmd from './../../plugins/utils/commandqueue/commandqueue.js';

const Map = Phaser.Structs.Map;

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })

        this.objs = new Map();
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        // alias function name
        this['create-sprite'] = this.createSprite;
        this['move-sprite-to'] = this.moveSpriteTo;

        var cmds = [
            ['print', 'hello'],
            ['print', 'world'],
            [
                ['create-sprite', 'A', 100, 100, 'mushroom'],
                ['move-sprite-to', 'A', 300, 200, 1]
            ]

        ];
        runCmd(cmds, this);
    }

    update() {}

    // commands
    print(msg) {
        console.log(msg);
    }

    createSprite(name, x, y, key) {
        if (this.objs.has(name)) {
            return;
        }
        this.objs.set(name, this.add.sprite(x, y, key));
    }

    moveSpriteTo(name, x, y, duration) {
        var sprite = this.objs.get(name);
        if (sprite == null) {
            return;
        }
        this.tweens.add({
            targets: sprite,
            x: x,
            y: y,
            duration: duration * 1000
        })
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);