import phaser from 'phaser/src/phaser.js';
import Maker from '../../templates/ui/maker/Maker.js';

const content = `
$type: Slider
width: 200
height: 20
orientation: x
input: drag

track:
    $type: RoundRectangle
    color: 0x260e04
    radius: 6
thumb:
    $type: RoundRectangle
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
        var maker = new Maker(this);
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
    scene: Demo
};

var game = new Phaser.Game(config);