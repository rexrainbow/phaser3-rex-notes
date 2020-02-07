import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('atlas', 'https://ikest.github.io/assets/atlases/atlas.png', 'https://ikest.github.io/assets/atlases/atlas.json')
    }

    create() {
        this.add.image(100, 100, 'atlas', 'button_coral_s_w_slice9');
        this.rexUI.add.label({
            anchor: {
                centerX: 'center',
                centerY: 'center'
            },
            width: 300, height: 400,
            background: this.rexUI.add.ninePatch(
                0,
                0,
                1,
                1,
                'atlas',
                [30, undefined, 30],
                [30, undefined, 30],
                {
                    baseFrame: 'button_coral_s_w_slice9'
                }
            )
        })
            .layout()
    }

    update(time, delta) {
    }
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);