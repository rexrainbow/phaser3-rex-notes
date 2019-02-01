import RoundrRctanglePlugin from '../../plugins/roundrectangle-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        // Rectangle
        this.add.rexRoundRectangle(100, 150, 100, 100, 0, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(250, 150, 100, 100, 30, 0x008888);
        // Circle
        this.add.rexRoundRectangle(400, 150, undefined, undefined, 50, 0x008888);
        // Rhombus
        this.add.rexRoundRectangle(550, 150, undefined, undefined, {
            radius: 50,
            iteration: 0
        }, 0x008888);
        // Octagon
        this.add.rexRoundRectangle(700, 150, 100, 100, {
            radius: 30,
            iteration: 0
        }, 0x008888);

        // Round-rectangle
        this.add.rexRoundRectangle(100, 300, 100, 100, {
            tl: 30,
            tr: 30
        }, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(250, 300, 100, 100, {
            tl: 50,
            tr: 50
        }, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(400, 300, 120, 60, 30, 0x008888);

        // Round-rectangle
        this.add.rexRoundRectangle(100, 450, 100, 100, {
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
        this.add.rexRoundRectangle(250, 450, 100, 100, {
            x: 40,
            y: 20
        }, 0x008888);
        // Ellipse
        this.add.rexRoundRectangle(400, 450, undefined, undefined, {
            x: 30,
            y: 60
        }, 0x008888);
        // Rhombus
        this.add.rexRoundRectangle(550, 450, undefined, undefined, {
            radius: {
                x: 60,
                y: 30
            },
            iteration: 0
        }, 0x008888);
        // Octagon
        this.add.rexRoundRectangle(700, 450, 100, 100, {
            radius: {
                x: 20,
                y: 30
            },
            iteration: 0
        }, 0x008888);
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