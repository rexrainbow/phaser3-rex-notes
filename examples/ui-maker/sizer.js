import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const content = `
# Styles
# Style of $type:Text
Text:
    fontSize: 20
    color: white

# Style of $class:background
.background:
    color: 0x260e04
    radius: 10
    strokeColor: 0x7b5e57
    strokeWidth: 2


# Game object
$root:
    $type: Sizer
    
    background:
        $type: RoundRectangle
        $class: background
    children:
        - $type: Text
          text: Hello
          color: white
        - $type: Text
          text: World
          color: yellow
        - $type: Text
          text: Phaser
          color: red
    
    space:
        left: 10
        right: 10
        top: 10
        bottom: 10
        item: 10
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