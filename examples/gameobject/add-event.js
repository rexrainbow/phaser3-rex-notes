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
    }

    update() { }
}

/*
var AddUpdateEvent = function (gameObject, callback, scope) {
    var eventEmitter = gameObject.scene.events;
    eventEmitter.on('update', callback, scope);
    gameObject.on('destroy', function () {
        eventEmitter.off('update', callback, scope);
    })
    return gameObject;
}
*/

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