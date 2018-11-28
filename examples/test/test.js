class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var key, url;
        for (var i = 0, icnt = names.length; i < icnt; i++) {
            for (var j = 0, jcnt = states.length; j < jcnt; j++) {
                key = getKey(names[i], states[j]);
                url = 'assets/images/characters/' + key + '.png';
                this.load.image(key, url);
            }
        }
    }

    create() {
        this.add.image(400, 300, getKey('A', 'smile'));
    }

    update() {}
}

var getKey = function (name, state) {
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