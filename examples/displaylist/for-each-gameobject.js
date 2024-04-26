import phaser from 'phaser/src/phaser.js';
import ForEachGameObjectInDisplayList from '../../plugins/utils/gameobject/displaylist/ForEachGameObjectInDisplayList';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

        this.img;
        this.text;
    }

    preload() { }

    create() {
        this.add.text(0, 0, 'AAA');

        var layer = this.add.layer()
        layer.add(this.add.text(0, 30, 'BBB'))
        layer.add(this.add.text(0, 60, 'CCC'))


        ForEachGameObjectInDisplayList(
            this, ['Text'],
            function (gameObject) {
                console.log(gameObject.text);
            }
        )
    }
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