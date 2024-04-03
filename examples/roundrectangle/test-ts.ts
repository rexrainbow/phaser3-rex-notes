import phaser from 'phaser/src/phaser.js';
import RoundrRctanglePlugin from '../../plugins/roundrectangle-plugin';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        // Rectangle
        this.add.rexRoundRectangle(100, 80, 100, 100, 0, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(250, 80, 100, 100, 30, 0x008888);
        // Circle
        this.add.rexRoundRectangle(400, 80, undefined, undefined, 50, 0x008888);
        // Rhombus
        this.add.rexRoundRectangle(550, 80, undefined, undefined, {
            radius: 50,
            iteration: 0
        }, 0x008888);
        // Octagon
        this.add.rexRoundRectangle(700, 80, 100, 100, {
            radius: 30,
            iteration: 0
        }, 0x008888);

        // Round-rectangle
        this.add.rexRoundRectangle(100, 200, 100, 100, {
            tl: 30,
            tr: 30
        }, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(250, 200, 100, 100, {
            tl: 50,
            tr: 50
        }, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(400, 200, 120, 60, 30, 0x008888);
        // Circle
        this.add.rexRoundRectangle({
            x: 550, y: 200,
            width: 100,
            color: 0x008888,
            shape: 'circle'
        });

        // Round-rectangle
        this.add.rexRoundRectangle(100, 330, 100, 100, {
            tl: {
                x: 10,
                y: 30
            },
            tr: {
                x: 10,
                y: 30
            },
        }, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(250, 330, 100, 100, {
            x: 40,
            y: 20
        }, 0x008888);
        // Ellipse
        this.add.rexRoundRectangle(400, 330, undefined, undefined, {
            x: 30,
            y: 60
        }, 0x008888);
        // Rhombus
        this.add.rexRoundRectangle(550, 330, undefined, undefined, {
            radius: {
                x: 60,
                y: 30
            },
            iteration: 0
        }, 0x008888);
        // Octagon
        this.add.rexRoundRectangle(700, 330, 100, 100, {
            radius: {
                x: 20,
                y: 30
            },
            iteration: 0
        }, 0x008888);

        // Round-rectangle
        this.add.rexRoundRectangle(100, 460, 100, 100, -20, 0x008888);
        // Circle
        this.add.rexRoundRectangle(250, 460, undefined, undefined, -50, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(400, 460, 100, 100, {
            tl: 20, tr: 20,
            bl: -20, br: -20
        }, 0x008888);
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexRoundrRctangle',
            plugin: RoundrRctanglePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);