import phaser from 'phaser/src/phaser.js';
import Maker from '../../templates/ui/maker/Maker.js';

const content = `
# Styles
# Style of $class:mylabel
.mylabel:
    $type: Label
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


# Game object
$root:
    $type: Buttons
    buttonsType: checkboxes
    
    background:
        $type: RoundRectangle
        color: 0x4e342e
        radius: 10
    buttons:
        - $class: mylabel
          name: A      
          text: {text: A}
        - $class: mylabel
          name: B
          text: {text: B}
        - $class: mylabel
          name: C
          text: {text: C}
        - $class: mylabel
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
        var maker = new Maker(this);
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
    scene: Demo
};

var game = new Phaser.Game(config);