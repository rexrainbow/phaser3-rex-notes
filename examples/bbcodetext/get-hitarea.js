import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var print = this.add.text(0, 0, '');

        var s1 = `...
...
[area=AAA]AAA[/area]
[area=BBB]BBB[/area]
[area=CCC]CCC[/area]
...
...`;
        var text = this.add.rexBBCodeText(400, 300, s1, {
            backgroundColor: '#555',
            fontSize: '24px',
        })
            .setScale(1.25)
            .setAngle(45)
            .drawAreaBounds(this.add.graphics(), 0xff0000)

        this.input
            .on('pointerdown', function (pointer) {
                var key = text.getHitArea(pointer.worldX, pointer.worldY, pointer.camera);
                if (!key) {
                    return;
                }
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