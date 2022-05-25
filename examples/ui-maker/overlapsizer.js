import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import Handlebars from 'handlebars';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const content = `
# Game object
$type: OverlapSizer
width: 300
height: 300

children:
    - $child:
          $type: RoundRectangle
          radius: 20
          color: {{COLOR_PRIMARY}}
      key: main

    - $child:
          $type: RoundRectangle
          radius: 20
          width: 40
          color: {{COLOR_DARK}}
      key: right
      align: right
      expand: { height: true }

    - $child:
          $type: RoundRectangle
          radius: 10
          width: 40
          height: 40
          color: {{COLOR_LIGHT}}
      key: bottom
      align: center-bottom
      offsetX: -100
      offsetY: -10
      expand: false

    - $child:
          $type: Label
          background:
              $type: RoundRectangle
              radius: 20
              color: {{COLOR_DARK}}
          icon:
              $type: RoundRectangle
              radius: 10
              width: 24
              height: 24
              color: {{COLOR_LIGHT}}
          text:
              $type: Text
              text: Start
          space: { left: 20, right: 20, top: 20, bottom: 20,  icon: 10 }
      key: center
      align: center
      expand: false

space: { left: 10, right: 10, top: 10, bottom: 10 }
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
        var data = Handlebars.compile(content)({
            COLOR_PRIMARY: COLOR_PRIMARY,
            COLOR_LIGHT: COLOR_LIGHT,
            COLOR_DARK: COLOR_DARK
        });
        var sizer = maker.make(data)
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