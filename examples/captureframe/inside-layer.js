import phaser from '../../../phaser/src/phaser.js';

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
        // this.cameras.main.setForceComposite(true);

        this.add.image(400, 300, 'classroom').setAlpha(0.5);

        var layer = this.add.layer();

        var image = this.add.image(400, 300, 'mushroom').setAlpha(0.5);

        var captureFrame = this.add.captureFrame('myCaptureFrame');

        layer.add([image, captureFrame]);

        var image1 = this.add.image(0, 0, 'myCaptureFrame');

        layer.enableFilters().filtersForceComposite = true;
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