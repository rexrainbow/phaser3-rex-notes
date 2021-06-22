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

        var s1 = `
[area=a0][size=10]ipq[/size][/area]
[area=a1][size=24]ipq[/size][/area]
[area=a2][size=38]ipq[/size][/area]
[area=a3][img=key][/area]
`;
        var text = this.add.rexBBCodeText(400, 300, s1, {
            backgroundColor: '#555',
            fontSize: '24px',
            align: 'right',
            wrap: {
                mode: 'char',
                width: 200
            },
        })
            .drawAreaBounds(this.add.graphics(), 0xff0000)
            .setInteractive()
            .on('areadown', function (key) {
                print.text += `Click area:${key}\n`
            })

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