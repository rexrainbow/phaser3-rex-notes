import phaser from '../../../phaser/src/phaser.js';

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
        var points = [{ x: -100, y: 0 }, { x: 100, y: 0 }];
        var card = this.add.rope(400, 300, 'poker', 'diamonds-1', points, true)

        this.debugGraphics = this.add.graphics();
        card.setDebug(this.debugGraphics);
    }

    update() {
        this.debugGraphics.clear();
        this.debugGraphics.lineStyle(2, 0x00ff00);
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