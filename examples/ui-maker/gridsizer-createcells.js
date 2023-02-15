import phaser from 'phaser/src/phaser.js';
import Maker from '../../templates/ui/maker/Maker.js';

const content = `
# Game object
$type: GridSizer
width: 400
height: 400
column: 8
row: 8
columnProportions: 1
rowProportions: 1

background:
    $type: RoundRectangle
    radius: 20
    color: 0x29434e

createCellContainerCallback:
    $child:
        $type: RoundRectangle
        strokeColor: 0xffffff
        radius: 14        
    expand: true

space: {
    top: 20, bottom: 20, left: 20, right: 20,
    column: 4, row: 4
}
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
        var sizer = maker.make(content)
            .setPosition(400, 300)
            .layout();
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