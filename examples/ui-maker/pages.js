import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const content = `
# Styles
# Style of $class:mylabel
.mylabel:
    $type: Label
    width: 40
    height: 40
    
    background:
        $type: RoundRectangle
        color: 0x5e92f3
        radius: 20
    text:
        $type: Text
        text: ''       # Override this property
        fontSize: 24
    
    space:
        left: 10
        right: 10
        top: 10
        bottom: 10

.mytabs:

# Game object
$root:
    $type: Pages
    width: 500

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
        var dialog = maker.make(content)
            .setPosition(400, 300)
            .layout()
            .setDraggable('title')

        var print = this.add.text(0, 0, '');
        dialog
            .on('button.click', function (button, groupName, index, pointer, event) {
                print.text += groupName + '-' + index + ': ' + button.text + '\n';
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