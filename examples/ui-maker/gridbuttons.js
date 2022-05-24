import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const content = `
# Styles
# Style of $class:mybutton
.mylabel:
    $type: Label
    width: 40
    height: 40
    
    background:
        $type: RoundRectangle
        color: 0x7b5e57
        radius: 10
    text:
        $type: Text
        text: ''       # Override this property
        fontSize: 20
    
    align: center


# Game object
$root:
    $type: GridButtons
    width: 300
    height: 400
    
    background:
        $type: RoundRectangle
        color: 0x4e342e
        radius: 20
    buttons:
        - 
            - $type: Label
              $class: mylabel
              text: {text: '7'}
            - $type: Label
              $class: mylabel
              text: {text: '8'}
            - $type: Label
              $class: mylabel
              text: {text: '9'}
        - 
            - $type: Label
              $class: mylabel
              text: {text: '4'}
            - $type: Label
              $class: mylabel
              text: {text: '5'}
            - $type: Label
              $class: mylabel
              text: {text: '6'}
        - 
            - $type: Label
              $class: mylabel
              text: {text: '1'}
            - $type: Label
              $class: mylabel
              text: {text: '2'}
            - $type: Label
              $class: mylabel
              text: {text: '3'}
        - 
            - $type: Label
              $class: mylabel
              text: {text: '<'}
            - $type: Label
              $class: mylabel
              text: {text: '0'}
            - $type: Label
              $class: mylabel
              text: {text: '.'}


    space: {
            left: 10, right: 10, top: 20, bottom: 20,
            row: 20, column: 10
           }
    
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
        var buttons = maker.make(content)
            .setPosition(400, 300)
            .layout()


        var print = this.add.text(0, 0, '');
        buttons
            .on('button.click', function (button, index, pointer, event) {
                var key = button.text;
                var word = print.text;
                if (key === '<') {
                    if (word.length > 0) {
                        word = word.substring(0, word.length - 1);
                    }
                } else {
                    word += key;
                }
                print.text = word;
            })
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