import RandomPlacePlugin from '../../plugins/randomplace-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var items = [], r = 8;
        for (var i = 0; i < 100; i++) {
            items.push(this.add.circle(0, 0, r, 0x757de8))
        }
        this.plugins.get('rexRandomPlace').randomPlace(items,
            {
                radius: (r + 2),
                area: new Phaser.Geom.Circle(400, 300, 150),
            }
        );
    }

    update() {

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
    plugins: {
        global: [{
            key: 'rexRandomPlace',
            plugin: RandomPlacePlugin,
            start: true
        },
        ]
    }
};

var game = new Phaser.Game(config);