'use strict'

import ShipPlugin from 'rexPlugins/ship-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        var obj = this.add.graphics()
            .fillStyle(0x00cccc, 1)
            .fillPoint(0, 0, 30)
            .fillStyle(0xcc0000, 1)
            .fillPoint(10, 0, 10)
            .setPosition(400, 300);
        this.physics.add.existing(obj, false);
        obj.body
            .setSize(30, 30)
            .setOffset(-15, -15);
        obj.ship = this.plugins.get('rexShip').add(obj, {});
        this.ship = obj;

        this.print = this.add.text(0, 0, '');
    }

    update() {
        this.print.setText('Speed = ' + this.ship.body.speed);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    backgroundColor: 0x333333,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    plugins: {
        global: [{
            key: 'rexShip',
            plugin: ShipPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);