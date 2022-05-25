import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

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
        var maker = this.rexUI.add.maker();
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