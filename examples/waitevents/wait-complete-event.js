import WaitEventsPlugin from '../../plugins/waitevents-plugin.js';
import MoveToPlugin from '../../plugins/moveto-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() {}

    create() {
        var waitEvents = this.plugins.get('rexWaitEvents').add(function () {
            console.log('All complete');
        });
        for (var i = 0; i < 10; i++) {
            var gameObject = addGameObject(this);
            gameObject.moveTo.moveTo(400, 300);
            waitEvents.waitEvent(gameObject.moveTo, 'complete');
        }
    }

    update() {}
}

const Random = Phaser.Math.Between;
var addGameObject = function (scene) {
    var x = Random(0, 800);
    var y = Random(0, 600);
    var r = Random(20, 40);
    var color = Random(0, 0xffffff);
    var gameObject = scene.add.circle(x, y, r, color);
    gameObject.moveTo = scene.plugins.get('rexMoveTo').add(gameObject, {
        speed: 100
    });
    return gameObject;
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
        global: [{
                key: 'rexWaitEvents',
                plugin: WaitEventsPlugin,
                start: true
            },
            {
                key: 'rexMoveTo',
                plugin: MoveToPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);