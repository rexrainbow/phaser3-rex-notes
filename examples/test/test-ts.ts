import 'phaser';
import { Label } from '../../templates/ui/ui-components'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var label = new Label(this, {
            x: 400,
            y: 300,
            orientation: 'y',
            space: {
                left: 10, right: 10, top: 10, bottom: 10
            },

            text: this.add.text(0, 0, 'aabb')
        })

        label.layout()

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
    scene: Demo
};

var game = new Phaser.Game(config);