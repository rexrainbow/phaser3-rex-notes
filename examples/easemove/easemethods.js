import phaser from 'phaser/src/phaser.js';
import EaseMovePlugin from '../../plugins/easemove-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    async create() {
        await InjectMethodToGameObject(this);
        await InjectMethodToGameObjectClass(this);
    }

    update() { }
}

var InjectMethodToGameObject = async function (scene) {
    var dot = scene.add.circle(400, 300, 20, 0xffffff);
    scene.plugins.get('rexEaseMove').injectMethods(dot);
    await dot.moveFromPromise(1500, '-=400', undefined, 'Bounce')
    await dot.moveToDestroyPromise(1500, '+=400')
}

var InjectMethodToGameObjectClass = async function (scene) {
    scene.plugins.get('rexEaseMove').injectMethods(Phaser.GameObjects.Rectangle.prototype);

    var rect = scene.add.rectangle(400, 300, 40, 40, 0x00ff00);
    await rect.moveFromPromise(1500, '-=400', undefined, 'Bounce')
    await rect.moveToDestroyPromise(1500, '+=400')

    var rect = scene.add.rectangle(400, 300, 40, 40, 0x0000ff);
    await rect.moveFromPromise(1500, '-=400', undefined, 'Bounce')
    await rect.moveToDestroyPromise(1500, '+=400')
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
                key: 'rexEaseMove',
                plugin: EaseMovePlugin,
                start: true
            },
        ]
    }
};

var game = new Phaser.Game(config);