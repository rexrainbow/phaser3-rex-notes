'use strict'

import InstDBPlugin from './../../plugins/instdb-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'demo'
        })
        this.instdb;
        this.text;
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        this.text = this.add.text(30, 30, "--");

        this.instdb = new InstDBPlugin(this);

        var inst;

        for (var i = 0; i < 20; i++) {
            inst = this.add.image(0, 0, 'mushroom').
                setInteractive().
                on('pointerover', function (event) {                    
                    this.scene.text.setText(InstDBPlugin.getId(this)); // this.$loki
                });

            this.instdb.addInst(inst);
        }
        this.shuffle();

        this.input.on('pointerdown', this.shuffle, this);

    }

    shuffle() {
        var allInsts = this.instdb.getAll();
        allInsts.forEach(function (inst) {
            inst.x = Phaser.Math.Between(0, 800);
            inst.y = Phaser.Math.Between(0, 600);
            inst.clearTint();
        });

        var query = {
            x: {
                '$gt': 400
            }
        };
        var coll = this.instdb.getCollection();
        Phaser.Actions.SetTint(coll.find(query), 0xff0000);
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);