import phaser from 'phaser/src/phaser.js';

class SceneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'sceneA'
        })
    }

    init() {
        console.log('SceneA init')
    }

    preload() {
        console.log('SceneA preload')
    }

    create() {
        console.log('SceneA create')
        this.scene.launch('sceneB');
    }

    update() {

    }
}

class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: 'sceneB'
        })
    }

    init() {
        console.log('SceneB init')
    }

    preload() {
        console.log('SceneB preload')
    }

    create() {
        console.log('SceneB create')
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
    scene: [SceneA, SceneB]
};

var game = new Phaser.Game(config);
console.log('Game created');

/*
Game preBoot
Game created
SceneA init
SceneA preload
SceneA create
Game postBoot
SceneB init
SceneB preload
SceneB create
*/