const ImageFile = Phaser.Loader.FileTypes.ImageFile;
const XHRLoader = Phaser.Loader.XHRLoader;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        // load image in preload stage
        this.load.image('arrow', 'assets/images/arrow.png');
    }

    create() {
        this.add.image(700, 500, 'arrow');

        // load image in update loop
        this.input.on('pointerdown', function () {
            this.load
                .image('map', 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap')
                .once('complete', function () {
                    this.add.image(0, 0, 'map').setOrigin(0);
                }, this)
                .start();
        }, this);

    }

    update() {}
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