import phaser from '../../../phaser/src/phaser.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var TESTMODE = 1;

        var gameObjecs;
        if (TESTMODE === 0) {
            gameObjecs = [
                this.add.image(400, 300, 'classroom').setScale(0.5).setOrigin(0.5, 0.5)
            ]
        } else {
            gameObjecs = [
                this.add.image(400, 300, 'classroom').setScale(0.5).setOrigin(1, 1),
                this.add.image(400, 300, 'classroom').setScale(0.5).setOrigin(0, 1),
                this.add.image(400, 300, 'classroom').setScale(0.5).setOrigin(1, 0),
                this.add.image(400, 300, 'classroom').setScale(0.5).setOrigin(0, 0),
            ]
        }

        this.maskGameObject = this.add.circle(400, 300, 50, 0xff0000).setVisible(false)
        var maskFilter = new Phaser.Filters.Mask(this.cameras.main, this.maskGameObject, true);

        gameObjecs.forEach(function (gameObject) {
            gameObject.enableFilters()
                .filters.external.add(maskFilter)
        })

        maskFilter.setActive(false)
        this.input
            .on('pointerdown', function () {
                maskFilter.setActive(true)
            })
            .on('pointerup', function () {
                maskFilter.setActive(false)
            })

    }

    update() {
        var pointer = this.input.activePointer;
        this.maskGameObject.setPosition(pointer.x, pointer.y);
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
    scene: Demo
};

var game = new Phaser.Game(config);