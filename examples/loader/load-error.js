import phaser from 'phaser/src/phaser.js';

class ScaneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'ScaneA'
        })
    }

    preload() {
        console.log('SceneA.preload')

        this.load.image('classroom', 'path/to/nothing/file');
        this.load.image('road', 'path/to/nothing/file');

        this.load.once('loaderror', function (fileObj) {
            console.log(fileObj);
            this.scene.start('SceneError');
        }, this)
    }

    create() {
        console.log('SceneA.create')
    }

    update() { }
}

class SceneError extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneError'
        })
    }

    preload() {
        console.log('SceneError.preload')
    }

    create() {
        console.log('SceneError.create')
        this.add.text(0, 300, 'SceneError');
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
    scene: [ScaneA, SceneError]
};

var game = new Phaser.Game(config);