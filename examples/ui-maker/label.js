import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const content = `
type: label
background:
    type: roundrectangle
    color: 0x260e04
    radius: 10
    strokeColor: 0x7b5e57
    strokeWidth: 2
icon:
    type: image
    key: person
text:
    type: text
    text: Hello
    fontSize: 24
action:
    type: image
    key: volume
space:
    left: 10
    right: 10
    top: 10
    bottom: 10
    icon: 10
    text: 10
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('person', 'assets/images/person.png');
        this.load.image('volume', 'assets/images/volume.png');
    }

    create() {
        var maker = this.rexUI.add.maker();
        var label = maker.make(content)
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