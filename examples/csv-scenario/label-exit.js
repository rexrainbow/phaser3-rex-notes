'use strict'

import Scenario from './../../plugins/runcommands/csvscenario/CSVScenario.js';

class ActionKlass extends Phaser.Events.EventEmitter {
    constructor(scene) {
        super();

        this.scene = scene;
        //this.myConsole = scene.add.text(100, 100, '');

        this['wait-click'] = this.waitClick;
        this['wait-time'] = this.waitTime;
    }

    // callbacks
    print(msg) {
        //this.myConsole.setText(msg);
        console.log(msg);
    }

    waitClick() {
        this.scene.input.once('pointerup', this.complete, this);
        return this;
    }

    waitTime(delay) {
        this.scene.time.delayedCall(delay * 1000, this.complete, [], this);
        return this;
    }

    complete() {
        this.emit('complete');
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
        var csvString = `-,print,hello
-,print,world
-,print,scenario
#label,AA,
-,print,rex
-,print,next
#exit,,
-,print,last`;
        var scenario = new Scenario(this);
        var myCmds = new ActionKlass(this);

        debugger        
        scenario.load(csvString, myCmds);
        scenario.start();
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