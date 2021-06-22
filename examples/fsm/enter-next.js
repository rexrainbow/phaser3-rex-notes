import 'phaser';
import FSMPlugin from '../../plugins/fsm-plugin.js';

var stateConfig = {
    states: {
        A: {
            next: 'B',
            enter: function () {
                console.log('enter A')
                this.next();
            }
        },
        B: {
            next: 'C',
            enter: function () {
                console.log('enter B')
                this.next();
            }
        },
        C: {
            next: function () {
                this.i++;
                if (this.i < 3) {
                    return 'A';
                } else {
                    return 'D';
                }
            },
            enter: function () {
                console.log('enter C')
                this.next();
            },
            exit: function () {
                console.log('exit C, i=' + this.i)
            }
        },
        D: {
            enter: function () {
                console.log('enter D')
            }
        }
    },
    extend: {
        i: 0
    }
};

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var state = this.plugins.get('rexFSM').add(stateConfig)
            .goto('A');
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexFSM',
            plugin: FSMPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);