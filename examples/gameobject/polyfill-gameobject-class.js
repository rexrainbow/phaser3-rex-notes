import phaser from 'phaser/src/phaser.js';

var methods = {
    methodA() { console.log('methodA') },
    methodB() { console.log('methodB') },
}

Object.assign(
    Phaser.GameObjects.GameObject.prototype,
    methods
)

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gameObject = this.add.rectangle(400, 300, 100, 100, 0x888888);
        gameObject.methodA();
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