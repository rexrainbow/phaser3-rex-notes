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

        var key, url;
        for (var i = 0, icnt = names.length; i < icnt; i++) {
            for (var j = 0, jcnt = states.length; j < jcnt; j++) {
                key = getCharacterKey(names[i], states[j]);
                url = 'assets/images/characters/' + key + '.png';
                this.load.image(key, url);
            }
        }
    }

    create() {
        this.stage = new Stage(this, 400, 300);
        this.stage.setBackground('classroom');
        this.stage.setCharacter('A', getCharacterKey('A', 'smile'), 1000);

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

var getCharacterKey = function (name, state) {
    return name + '-' + state;
}

var names = [
    'A',
    'B',
    'C'
];
var states = [
    'anger',
    'confuse',
    'dizzy',
    'happy',
    'none',
    'shock',
    'smile'
];


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);