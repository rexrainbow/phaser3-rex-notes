import 'phaser';
import NinePatchPlugin from '../../plugins/ninepatch-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg2', 'assets/images/ninepatch/nine-patch.png');
    }

    create() {
        var ninePatch0 = this.add.rexNinePatch({
            x: 400, y: 200,
            width: 100, height: 80,
            key: 'bg2',
            columns: [20, undefined, 20],
            rows: [20, undefined, 20],
        })
        console.log(`ninePatch0= ${ninePatch0.fixedPartScaleX} x ${ninePatch0.fixedPartScaleY}`)

        var ninePatch1 = this.add.rexNinePatch({
            x: 400, y: 300,
            width: 100, height: 80,
            key: 'bg2',
            columns: [20, undefined, 20],
            rows: [20, undefined, 20],

            maxFixedPartScale: 0.5
        })
        console.log(`ninePatch1= ${ninePatch1.fixedPartScaleX} x ${ninePatch1.fixedPartScaleY}`)

        var ninePatch2 = this.add.rexNinePatch({
            x: 400, y: 400,
            width: 100, height: 80,
            key: 'bg2',
            columns: [20, undefined, 20],
            rows: [20, undefined, 20],

            maxFixedPartScale: 2
        })
        console.log(`ninePatch2= ${ninePatch2.fixedPartScaleX} x ${ninePatch2.fixedPartScaleY}`)
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
            key: 'rexNinePatch',
            plugin: NinePatchPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);