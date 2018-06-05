'use strict'

import FSM from './../../plugins/fsm.js';

class State extends FSM {
    constructor() {
        var config = {
            start: 'A',
            states: {
                A: {
                    next: 'B',
                    enter: function () {
                        console.log('enter A')
                    }
                },
                B: {
                    next: 'C',
                    enter: function () {
                        console.log('enter B')
                    }
                },
                C: {
                    exit: function () {
                        console.log('exit C, i=' + this.i)
                    },
                    enter: function () {
                        console.log('enter C')
                    }
                },
                D: {
                    enter: function () {
                        console.log('enter D')
                    }
                }
            }
        }
        super(config);

        this.i = 0;
    }

    next_C() {
        this.i++;
        if (this.i < 3) {
            return 'A';
        } else {
            return 'D';
        }

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
        this.state = new State();
        var scene = this;
        scene.input.on('pointerup', function () {
            scene.state.next();
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