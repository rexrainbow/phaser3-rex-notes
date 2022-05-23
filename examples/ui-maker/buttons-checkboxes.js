import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const labelStyle = `
width: 100
height: 40

icon:
    $type: RoundRectangle
    strokeColor: 0x260e04
    radius: 10
text:
    $type: Text
    text: ''       # Override this property
    fontSize: 20

space:
    left: 10
    right: 10
    icon: 10
`

const content = `
$type: Buttons
buttonsType: checkboxes

background:
    $type: RoundRectangle
    color: 0x4e342e
    radius: 10
buttons:
    - $type: Label
      $class: mylabel
      name: A      
      text: {text: A}
    - $type: Label
      $class: mylabel
      name: B
      text: {text: B}
    - $type: Label
      $class: mylabel
      name: C
      text: {text: C}
    - $type: Label
      $class: mylabel
      name: D
      text: {text: D}

orientation: y
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

            .on('button.statechange', function (button, index, value, previousValue) {
                button.getElement('icon')
                    .setFillStyle((value) ? 0x7b5e57 : undefined);
            })
            .clearAllButtonsState()

        // Dump states
        var print = this.add.text(0, 0, '');
        var dumpButtonStates = function () {
            var s = '';
            var states = buttons.getAllButtonsState();
            for (var key in states) {
                s += `${key}:${states[key]}\n`
            }
            print.setText(s);
        }
        buttons.on('button.click', dumpButtonStates);
        dumpButtonStates();

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