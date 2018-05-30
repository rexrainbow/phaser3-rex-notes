'use strict'

import CSVScenarioPlugin from './../../plugins/csvscenario-plugin.js';

var csvString =
`#IF,this.coin > 100,AA
#IF,this.coin > 10,BB
#IF,,CC
#LABEL,AA,
-,print,I can eat anything
#EXIT,,
#LABEL,BB,
-,print,I have a cup of tea
#EXIT,,
#LABEL,CC,
-,print,Game over
#EXIT,,`;

class ActionKlass extends Phaser.Events.EventEmitter {
    constructor(scene) {
        super();
        this.scene = scene;
        this.coin = 50;
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
        var scenario = this.plugins.get('rexCSVScenario').add(this);
        var myCmds = new ActionKlass(this);

        this.input.on('pointerup', function () {
            scenario.continue('click');
        });

        scenario
            .on('log', function (msg) {
                console.log(msg)
            })
            .on('complete', function () {
                console.log('scenario complete')
            })
            .load(csvString, myCmds, {
                timeUnit: 'sec'
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCSVScenario',
            plugin: CSVScenarioPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);