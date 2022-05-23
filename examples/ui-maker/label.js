import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import Handlebars from 'handlebars';

const content = `
$type: Label

background:
    $type: RoundRectangle
    color: 0x260e04
    radius: 10
    strokeColor: 0x7b5e57
    strokeWidth: 2
icon:
    $type: Image
    key: person
text:
    $type: Text
    text: Hello {{name}}
    fontSize: 24
action:
    $type: Image
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
        var data = Handlebars.compile(content)({ name: 'phaser' });
        var label = maker.make(data)
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