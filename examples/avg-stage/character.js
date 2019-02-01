import Stage from '../../templates/avg/stage/Stage.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.atlas('characters', 'assets/images/characters/characters.png', 'assets/images/characters/characters.json');
    }

    create() {
        this.stage = new Stage(this, 400, 300);
        this.stage.setBackground('classroom');
        this.stage.setCharacter('A', 'characters', 'A-smile', 1000);

        var characterA = this.stage.getCharacter('A');
        characterA.setRx(0.3);
        var tween = this.tweens.add({
            delay: 1000,
            targets: this.stage.getCharacter('A'),
            x: '+=50', // '+=100'
            ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0, // -1: infinity
            yoyo: false
        });
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