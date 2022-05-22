import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const labelStyle = `
width: 40
height: 40

background:
    $type: RoundRectangle
    color: 0x4e342e
    radius: 10
text:
    $type: Text
    text: ''       # Override this property
    fontSize: 20

space:
    left: 10
    right: 10
    top: 10
    bottom: 10
`

const content = `
$type: FixWidthSizer

background:
    $type: RoundRectangle
    color: 0x260e04
    radius: 10
    strokeColor: 0x7b5e57
    strokeWidth: 2
children:
    - $type: Label
      $class: mylabel
      text: {text: Hello}
    - $type: Label
      $class: mylabel
      text: {text: World}
    - $type: Label
      $class: mylabel
      text: {text: Phaser}
    - $type: Label
      $class: mylabel
      text: {text: AAAA}
    - $type: Label
      $class: mylabel
      text: {text: BBBBBBBBB}

width: 400
height: 300
align: center

space:
    left: 10
    right: 10
    top: 10
    bottom: 10
    item: 5
    line: 5
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
        maker.addStyle('.mylabel', labelStyle);

        var fixwidthSizer = maker.make(content)
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