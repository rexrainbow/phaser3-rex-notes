import phaser from 'phaser/src/phaser.js';
import GetViewport from '../../plugins/utils/system/GetViewport.js';


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
        var camera = this.cameras.main;
        camera.setZoom(0.75).setScroll(-100, -100)
        var sprites = [
            this.add.image(-200, -200, 'mushroom'),
            this.add.image(-100, -100, 'mushroom'),
            this.add.image(0, 0, 'mushroom'),
            this.add.image(400, 300, 'mushroom'),
            this.add.image(800, 600, 'mushroom'),
            this.add.image(900, 700, 'mushroom'),
            this.add.image(1000, 800, 'mushroom'),
        ];

        var viewport = GetViewport(this, camera);
        var rt = this.add.renderTexture(
            viewport.x,
            viewport.y,
            viewport.width,
            viewport.height
        );

        rt.camera.setScroll(rt.x, rt.y);

        rt
            .draw(sprites)
            .setTint(0xff0000)
            .setAlpha(0.75)

        console.log(camera);
        console.log(viewport);
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
    scene: Demo,
};

var game = new Phaser.Game(config);