'use strict'

import InstDBPlugin from './../../plugins/instdb-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'demo'
        })
        this.instdb;
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        this.instdb = new InstDBPlugin(this);
        for (var i = 0; i < 20; i++) {
            var inst = this.add.image(
                Phaser.Math.Between(0, 800),
                Phaser.Math.Between(0, 600),
                'mushroom').setInteractive();
            this.input.setDraggable(inst);
            this.instdb.addInst(inst);
        }
        this.test();

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.input.on('dragend', this.test, this);
    }

    test() {
        var coll = this.instdb.getCollection();

        //var allInsts = coll.find();
        Phaser.Actions.SetTint(coll.find(), 0xffffff);

        var query = {
            x: {
                '$gt': 400
            }
        };
        // var res = coll.find(query);
        Phaser.Actions.SetTint(coll.find(query), 0xff0000);
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