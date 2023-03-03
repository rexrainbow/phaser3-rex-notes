import phaser from 'phaser/src/phaser.js';
import Maker from '../../templates/ui/maker/Maker.js';

const content = `
$type: ScrollBar
width: 400
orientation: x

background:
    $type: RoundRectangle
    color: 0x260e04    
slider:
    thumb:
        $type: RoundRectangle
        color: 0x7b5e57
        radius: 10
        width: 40
        height: 20
buttons:
    left:
        $type: RoundRectangle
        color: 0x4e342e
        width: 20
        height: 20
    right:
        $type: RoundRectangle
        color: 0x4e342e
        width: 20
        height: 20  
space: {left: 10, right: 10, top: 10, bottom: 10}
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
        var scrollBar = maker.make(content)
            .setPosition(400, 300)
            .layout();

        var print = this.add.text(0, 0, '');
        scrollBar
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