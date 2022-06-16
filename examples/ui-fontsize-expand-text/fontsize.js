import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var sizer = this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 600,
            orientation: 'x',
            space: { left: 10, right: 10, top: 10, bottom: 10 }
        })
            .addBackground(
                this.rexUI.add.roundRectangle({ strokeColor: 0xffffff })
            )
            .add(
                this.rexUI.fontSizeExpandText(this.add.text(0, 0, 'A', { backgroundColor: '#7b5e57' })),
                { proportion: 1 }
            )
            .add(
                this.rexUI.fontSizeExpandText(this.add.text(0, 0, 'BBBB', { backgroundColor: '#4e342e' })),
                { proportion: 1 }
            )
            .add(
                this.rexUI.fontSizeExpandText(this.add.text(0, 0, 'CCCCCCCC', { backgroundColor: '#260e04' })),
                { proportion: 1 }
            )
            .layout()

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
    dom: {
        createContainer: true
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