import PerspectiveImagePlugin from '../../plugins/perspectiveimage-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');
    }

    create() {
        var image = this.add.rexPerspectiveImage(400, 300, 'classroom');

        this.debug = this.add.graphics();        
        image.setDebug(this.debug);


        this.input.on('pointermove', function (pointer) {

            if (!pointer.isDown) {
                return;
            }
            
            image.modelRotation.y += pointer.velocity.x * (1 / 800);
        });
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00); 
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
    backgroundColor: 0x33333,
    plugins: {
        global: [{
            key: 'rexPerspectiveImage',
            plugin: PerspectiveImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);