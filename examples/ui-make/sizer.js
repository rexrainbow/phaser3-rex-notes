import phaser from 'phaser/src/phaser.js';
import YAMLMake from '../../templates/ui/make/YAMLMake.js';

const content = `
type: sizer
background:
    type: roundrectangle
    color: 0x260e04
    radius: 10
    strokeColor: 0x7b5e57
    strokeWidth: 2
children:
    - type: text
      text: Hello
      fontSize: 20
      color: white
    - type: text
      text: World
      fontSize: 20
      color: yellow
    - type: text
      text: Phaser
      fontSize: 20
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
        var label = YAMLMake(this, content)
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

};

var game = new Phaser.Game(config);