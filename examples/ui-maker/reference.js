import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const content = `
# Reference of child
- &child0
  $type: Text 
  text: Hello
  color: white

- &child1
  $type: Text
  text: World
  color: yellow

- &child2
  $type: Text
  text: Phaser
  color: red

- &space
  left: 10
  right: 10
  top: 10
  bottom: 10
  item: 10

# Last item of array is the root/return config
- $type: Sizer
  background:
      $type: RoundRectangle
      $class: background
  children:
      - *child0
      - *child1
      - *child2

  space:
      *space
`

const styles = `
Text:
    fontSize: 20
    color: white
.background:
    color: 0x260e04
    radius: 10
    strokeColor: 0x7b5e57
    strokeWidth: 2
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var maker = this.rexUI.add.maker(styles);
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