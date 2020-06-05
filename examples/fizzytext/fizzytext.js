import FizzyText from '../../templates/fizzytext/FizzyText.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('flares', 'assets/images/particles/flares/flares.png', 'assets/images/particles/flares/flares.json');
    }

    create() {
        var fizzyText = new FizzyText(this, 400, 300, 'Hello', {
            style: {
                fontSize: '80px',
            },
            textureKey: 'flares'
        });
        this.add.existing(fizzyText);
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