import FlipPlugin from '../../plugins/flip-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.atlas('poker', 'assets/images/poker/poker.png', 'assets/images/poker/poker.json');
    }

    create() {
        for (var i = 0; i < 8; i++) {
            let x = i * 80 + 80;
            let y = 300;
            let frame = `diamonds-${i+1}`;
            let card = this.add.image(x, y, 'poker', frame);
            let flip = this.plugins.get('rexFlip').add(card, {
                face: 'back',
                front: { frame: card.frame.name },
                back: { frame: 'bg-2' },

                duration: 500,
            });

            card
                .setInteractive()
                .on('pointerdown', function () {
                    flip.flip();
                });
        }
    }

    update() { }
}

var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexFlip',
            plugin: FlipPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);