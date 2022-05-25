import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const content = `
# Game object
$type: GridSizer
column: 3
row: 3

background:
    $type: RoundRectangle
    radius: 20
    color: 0x29434e
children:
    - $child:
        $type: RoundRectangle
        width: 200
        height: 200
        radius: 20
        color: 0x003d33
      column: 1
      row: 1

    - $child:
        $type: RoundRectangle
        width: 100
        height: 100
        radius: 20
        color: 0x78002e
      column: 0
      row: 1
      expand: true

    - $child:
        $type: RoundRectangle
        width: 100
        height: 100
        radius: 20
        color: 0x8e0000
      column: 1
      row: 0
      expand: true

    - $child:
        $type: RoundRectangle
        width: 100
        height: 100
        radius: 20
        color: 0x005005
      column: 1
      row: 2
      expand: true

    - $child:
        $type: RoundRectangle
        width: 100
        height: 100
        radius: 20
        color: 0x004c8c
      column: 2
      row: 1
      expand: true
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