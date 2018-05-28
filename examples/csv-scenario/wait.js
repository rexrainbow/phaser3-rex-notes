'use strict'

import Scenario from './../../plugins/runcommands/csvscenario/CSVScenario.js';

var csvString = `0,print,hello
1.2,print,world
click,print,scenario`;

class ActionKlass extends Phaser.Events.EventEmitter {
    constructor(scene) {
        super();
        this.scene = scene;
    }

    // callbacks
    print(s) {
        console.log(s);
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
        var scenario = new Scenario(this);
        var myCmds = new ActionKlass(this);

        this.input.on('pointerup', function () {
            scenario.resume('click');
        });

        scenario
            .load(csvString, myCmds)
            .on('complete', function () {
                console.log('scenario complete')
            })
            .start();
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