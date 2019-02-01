import Stage from '../../templates/avg/stage/Stage.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {
        this.load.image('road', 'assets/images/backgrounds/road.png');
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        this.stage = new Stage(this, 400, 300);
        this.stage.setBackground('road', 2000);

        this.input.on('pointerdown', function (pointer) {
            var textureKey = this.stage.getElement('background').textureKey;
            var nextKey = (textureKey === 'road') ? 'classroom' : 'road';
            this.stage.setBackground(nextKey, 2000);
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