import phaser from 'phaser/src/phaser.js';
import TextPlayerPlugin from '../../plugins/textplayer-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var content = `[color=red][b]P[/b][/color]haser is a fast, 
free, and fun open source HTML5 game framework that offers WebGL and 
Canvas rendering across desktop and mobile web browsers.`

        var config = {
            width: 200,

            background: { color: 'grey' },

            style: {
                fontSize: '16px',
                stroke: 'green',
                strokeThickness: 3,

                shadowColor: 'red',
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowBlur: 3
            },

            wrap: {
                wrapMode: 'word',
                hAlign: 'justify'
            },

            typing: {
                speed: 0,  // 0: no-typing
            },

            text: content
        }

        var text0 = this.add.rexTextPlayer(200, 300, { ...config }).setScale(2)

        var text1 = this.add.rexTextPlayer(600, 300, { ...config, resolution: 2 }).setScale(2)


        var graphics = this.add.graphics({
            lineStyle: {
                width: 2, color: 0x00ff00, alpha: 1
            }
        })
            .strokeRectShape(text0.getBounds())
            .strokeRectShape(text1.getBounds())
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
            key: 'rexTextPlayer',
            plugin: TextPlayerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);