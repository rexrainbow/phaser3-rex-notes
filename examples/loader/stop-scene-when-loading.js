import phaser from 'phaser/src/phaser.js';

class ScaneA extends Phaser.Scene {
    constructor() {
        super({
            key: 'ScaneA'
        })
    }

    preload() {
        console.log('In SceneA.preload');

        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');

        this.load.once('complete', function () {
            console.log('SceneA.preload complete')
        });

        this.scene.start('SceneB');
    }

    create() {
        this.add.image(400, 300, 'classroom').setAlpha(0.5);
        this.add.text(0, 0, 'SceneA');
    }

    update() { }
}

class SceneB extends Phaser.Scene {
    constructor() {
        super({
            key: 'SceneB'
        })
    }

    preload() {
        console.log('In SceneB.preload');

        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');

        this.load.once('complete', function () {
            console.log('SceneB.preload complete');
        });
    }

    create() {
        this.add.image(400, 300, 'classroom').setAlpha(0.5);
        this.add.text(0, 0, 'SceneB');
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
    scene: [ScaneA, SceneB]
};

var game = new Phaser.Game(config);