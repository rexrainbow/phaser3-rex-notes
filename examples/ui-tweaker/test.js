import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import Tweaker from '../../templates/ui/tweaker/Tweaker.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var obj = {
            a: 10,
            b: 'Phaser'
        }

        var panel = new Tweaker(this, {
            x: 400, y: 300,
            width: 300, height: 300,

            styles: {
                background: {
                    radius: 20,
                    strokeColor: 0xffffff
                }
            }
        })
            .layout();

        this.add.existing(panel);
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);