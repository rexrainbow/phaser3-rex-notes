import UIPlugin from 'rexTemplates/ui/ui-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var print = this.add.text(0, 0, '');

        var slider = this.rexUI.add.slider({
                x: 400,
                y: 300,
                width: 20,
                height: 200,
                orientation: 1,

                track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 8, 0x555555),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xffffff),

                valuechangeCallback: function (value) {
                    print.text = value;
                }
            })
            .layout();
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
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