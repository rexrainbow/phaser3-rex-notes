import phaser from 'phaser/src/phaser.js';
import ToJSON from '../../plugins/utils/gameobject/serialize/ToJSON.js';
import FromJSON from '../../plugins/utils/gameobject/serialize/FromJSON.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {        
        var layer = this.add.layer();
        for (var i = 0; i < 100; i++) {
            var gameObject = this.make.image({
                key: 'mushroom',
                x: { randFloat: [0, 800] },
                y: { randFloat: [0, 800] },
                angle: { randFloat: [0, 360] },
                scale: {
                    x: { randFloat: [0.5, 1.5] },
                    y: { randFloat: [0.5, 1.5] },
                },
                add: false
            })

            layer.add(gameObject);
        }

        // To dataList
        var dataList = ToJSON(layer, function (gameObject) {
            return {
                key: gameObject.texture.key,
                x: gameObject.x,
                y: gameObject.y,
                angle: gameObject.angle,
                scale: {
                    x: gameObject.scaleX,
                    y: gameObject.scaleY
                }
            }
        }, true)

        console.log(dataList);

        // Make game object from dataList
        this.input.once('pointerdown', function () {
            layer.destroy();

            FromJSON(this, dataList, function (scene, data) {
                return scene.make.image(data);
            })
            console.log('Make game object from dataList')
        }, this)

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
};

var game = new Phaser.Game(config);