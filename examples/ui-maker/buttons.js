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
$type: Buttons

background:
    $type: RoundRectangle
    color: 0x260e04
    radius: 20
buttons:
    - $type: Label
      $class: mylabel      
      text: {text: Choice0}
    - $type: Label
      $class: mylabel
      text: {text: Choice1}
    - $type: Label
      $class: mylabel
      text: {text: Choice2}

orientation: y
space:
    left: 10
    right: 10
    top: 10
    bottom: 10
    item: 10

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
        maker.addStyle('.mylabel', labelStyle)

        var buttons = maker.make(content)
            .setPosition(400, 300)
            .layout()

        var print = this.add.text(0, 0, '');
        buttons
            .on('button.click', function (button, index, pointer, event) {
                print.text += index + ': ' + button.text + '\n';
            })
            .on('button.over', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle();
            });
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