import phaser from 'phaser/src/phaser.js';
import Maker from '../../templates/ui/maker/Maker.js';

const content = `
$type: BadgeLabel
width: 80
height: 80

background:
    $type: RoundRectangle
    color: 0x4e342e
    radius: 10
main:
    $type: Text
    text: Item
    fontSize: 20
    color: white

rightBottom:
    $type: Text
    color: yellow
    backgroundColor: '#260e04'
    align: right
    padding: { left: 3, right: 3, top: 3, bottom: 3 }

space:
    left: -5
    right: -5
    top: -5
    bottom: -5
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var maker = new Maker(this);
        var item = maker.make(content)
            .setPosition(400, 300)
            .layout();

        item.on('changedata-itemCount', function (parent, value, previousValue) {
            item.getElement('rightBottom').setText(value);
            item.layout();
        }, item)

        item.setData('itemCount', undefined)
            .setData('itemCount', 3)

        item
            .setInteractive()
            .on('pointerdown', function () {
                item.setData('itemCount', item.getData('itemCount') + 1)
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
    scene: Demo

};

var game = new Phaser.Game(config);