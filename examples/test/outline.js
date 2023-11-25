import phaser from 'phaser/src/phaser.js';
import OutlinePipelinePlugin from '../../plugins/outlinepipeline-plugin.js';
import MoveToPlugin from '../../plugins/moveto-plugin.js';


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var postFxPlugin = this.plugins.get('rexOutlinePipeline');

        this.add.image(400, 300, 'classroom')

        var gameObject = this.add.image(400, 300, 'mushroom')
        gameObject.moveTo = this.plugins.get('rexMoveTo').add(gameObject, {
            speed: 400,
            rotateToTarget: true
        })
            .on('start', function (dot, moveTo) {
                if (postFxPlugin.get(gameObject)[0]) {
                    return;
                }

                postFxPlugin.add(gameObject, {
                    thickness: 5,
                    outlineColor: 0xff0000
                });
            })
            .on('complete', function () {
                postFxPlugin.remove(gameObject);
            })

        this.input.on('pointerdown', function (pointer) {
            var touchX = pointer.x;
            var touchY = pointer.y;
            gameObject.moveTo.moveTo(touchX, touchY);
        });


        this.cameras.main.startFollow(gameObject);
    }

    update() {
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
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexOutlinePipeline',
                plugin: OutlinePipelinePlugin,
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