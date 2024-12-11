import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('key', 'assets/images/key.png');
    }

    create() {
        var print = this.add.text(0, 0, '');

        var s1 = `1234[area=ABC] [color=yellow]ABC[/color] [/area]5678
[area=DEF] DEF [/area] 90 [area=GHI]GHI[/area]

[url=https://rexrainbow.github.io/phaser3-rex-notes/docs/site/index.html]Document[/url]
[url=https://github.com/rexrainbow/phaser3-rex-notes/]Github[/url]
[area=KEY][img=key][/area]
`;
        var text = this.add.rexBBCodeText(400, 30, s1, {
            backgroundColor: '#555',
            fontSize: '24px',
            align: 'right',
            wrap: {
                mode: 'char',
                width: 200
            },

            images: {
                key: { y: -8 }
            },

            interactive: true
        })
            .drawAreaBounds(this.add.graphics(), 0xff0000)

        var scene = this;
        text
            .on('areadown', function (key) {
                print.text += `Down area:${key}\n`;
            })
            .on('areaclick', function (key) {
                print.text += `Click area:${key}\n`;
            })
            .on('areaover', function (key) {
                print.text += `Over area:${key}\n`;
                //scene.input.manager.canvas.style.cursor = 'pointer';
            })
            .on('areaout', function (key) {
                print.text += `Out area:${key}\n`;
                //scene.input.manager.canvas.style.cursor = '';
            })

        var txt2 = this.add.rexBBCodeText(400, 300, '[area=1][hit me][/area]', {
            backgroundColor: '#555',
            fontSize: '24px'
        })
            .setInteractive()
            .on('areaclick', function () {
                // Clear hit-area
                this.setText('123456')
            });

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
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);