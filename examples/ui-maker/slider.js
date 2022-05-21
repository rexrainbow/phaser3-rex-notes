import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const content = `
type: slider
width: 200
height: 20
orientation: x
input: drag

track:
    type: roundrectangle
    color: 0x260e04
    radius: 6
thumb:
    type: roundrectangle
    color: 0x7b5e57
    radius: 10
space:
    top: 4
    bottom: 4
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var maker = this.rexUI.add.maker();
        var slider = maker.make(content)
            .setPosition(400, 300)
            .layout();

        var print = this.add.text(0, 0, '');
        slider
            .on('valuechange', function (newValue, oldValue, slider) {
                print.text = newValue;
            })
            .setValue(0.5)
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }

};

var game = new Phaser.Game(config);