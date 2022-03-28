import phaser from 'phaser/src/phaser.js';
import EaseDataPlugin from '../../plugins/easedata-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var print = this.add.text(0, 0, '');
        var dot = this.add.circle(400, 300, 20, 0xffffff);

        dot
            .on('changedata-hp', function (gameObject, value, previousValue) {
                print.text = value;
            })
            .setData('hp', undefined)
            .setData('hp', 100)

        var easeData = this.plugins.get('rexEaseData').add(dot)

        this.input
            .on('pointerdown', function () {
                dot.setData('hp', 100)
                easeData
                    .easeTo('hp', 0, 3000)
                    .once('complete-hp', function () {
                        print.text += '\nComplete'
                    })
            })
            .on('pointerup', function () {
                easeData.stopAll()
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
        global: [
            {
                key: 'rexEaseData',
                plugin: EaseDataPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);