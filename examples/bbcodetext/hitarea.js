import 'phaser';
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

[area=url:https://rexrainbow.github.io/phaser3-rex-notes/docs/site/index.html]Document[/area]
[area=url:https://github.com/rexrainbow/phaser3-rex-notes/]Github[/area]
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
            }
        })
            .drawAreaBounds(this.add.graphics(), 0xff0000)
            .setInteractive()
            .on('areadown', function (key) {
                if (!IsURLKey(key)) {
                    print.text += `Click area:${key}\n`
                }
            })
            .on('areaup', function (key) {
                if (IsURLKey(key)) {
                    window.open(GetURL(key), '_blank');
                }
            })

    }

    update() { }
}

var IsURLKey = function (key) {
    return (key.substring(0, 4) === 'url:');
}

var GetURL = function (key) {
    return key.substring(4, key.length);
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