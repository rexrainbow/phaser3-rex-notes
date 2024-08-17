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

        var text = this.add.rexTextPlayer(
            {
                x: 400, y: 300,
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
                    hAlign:'justify'
                },

                typing: {
                    speed: 0,  // 0: no-typing
                },

                text: content
            },
        )

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