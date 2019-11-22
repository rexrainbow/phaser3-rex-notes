import NinePatchPlugin from '../../plugins/ninepatch-plugin.js'


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg3', 'https://i.ibb.co/jyg60YK/actionbox.png'); // 372 x 561
    }

    create() {
        this.add.rexNinePatch({
            x: 200, y: 430,
            width: 372*2, height: 561/2,
            key: 'bg3',
            columns: [100, undefined, 100],
            rows: [100, undefined, 100],
            stretchMode: 0
        }).setScale(0.5)

        this.add.rexNinePatch({
            x: 200, y: 200,
            width: 372*2, height: 561,
            key: 'bg3',
            columns: [100, undefined, 100],
            rows: [100, undefined, 100],
            stretchMode: 0
        }).setScale(0.5)

        this.add.rexNinePatch({
            x: 500, y: 200,
            width: 372/2, height: 561,
            key: 'bg3',
            columns: [100, undefined, 100],
            rows: [100, undefined, 100],
            stretchMode: 0
        }).setScale(0.5)
    }

    update(time, delta) {
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
            key: 'rexNinePatch',
            plugin: NinePatchPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);