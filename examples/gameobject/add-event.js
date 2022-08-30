import phaser from 'phaser/src/phaser.js';
import AddUpdateEvent from '../../plugins/utils/gameobject/addevent/AddUpdateEvent.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gameObject = this.add.rectangle(400, 300, 100, 100).setStrokeStyle(2, 0xffffff);

        AddUpdateEvent(gameObject, function (time, delta) {
            gameObject.angle += (delta / 1000) * 180;
        })

        // Or a scene target
        AddUpdateEvent(this, function (time, delta) {
            gameObject.alpha = (time / 1000) % 1;
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