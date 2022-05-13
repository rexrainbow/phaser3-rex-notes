import phaser from 'phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    init() {
        console.log('Scene init')
    }

    preload() {
        console.log('Scene preload')
    }

    create() {
        console.log('Scene create')
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    callbacks: {
        preBoot: function () { console.log('Game preBoot') },
        postBoot: function () { console.log('Game postBoot') },
    },
    scene: Demo
};

var game = new Phaser.Game(config);
console.log('Game created');

/*
1. Game created
2. Game preBoot
3. Scene init
4. Scene preload
5. Scene create
6. Game postBoot
*/