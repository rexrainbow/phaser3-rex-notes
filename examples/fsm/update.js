import phaser from 'phaser/src/phaser.js';
import FSMPlugin from '../../plugins/fsm-plugin.js';

var stateConfig = {
    states: {
        A: {
            next: 'B',
            enter: function () {
                this.startUpdate();
            },
            update: function () {
                console.log('update A');
                this.next();
            }
        },
        B: {
            next: 'C',
            update: function () {
                console.log('update B');
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
            update: function () {
                console.log('update C');
                this.next();
            },
            exit: function () {
                console.log('exit C, i=' + this.i)
            }
        },
        D: {
            update: function () {
                console.log('update D');
                this.i++;

                if (this.i > 30) {
                    this.stopUpdate();
                }
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
        stateConfig.scene = this;
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