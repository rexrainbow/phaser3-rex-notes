import RoundrRctanglePlugin from 'rexPlugins/roundrectangle-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        // Rectangle
        this.add.rexRoundRectangle(100, 200, 100, 100, undefined, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(250, 200, 100, 100, 30, 0x008888);
        // Circle
        this.add.rexRoundRectangle(400, 200, undefined, undefined, 50, 0x008888);
        // Rhombus
        this.add.rexRoundRectangle(550, 200, undefined, undefined, {
            radius: 50,
            iteration: 0
        }, 0x008888);
        // Octagon
        this.add.rexRoundRectangle(700, 200, 100, 100, {
            radius: 30,
            iteration: 0
        }, 0x008888);

        // Round-rectangle
        this.add.rexRoundRectangle(100, 350, 100, 100, {
            tl: 30,
            tr: 30
        }, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(250, 350, 100, 100, {
            tl: 50,
            tr: 50
        }, 0x008888);
        // Round-rectangle
        this.add.rexRoundRectangle(400, 350, 120, 60, 30, 0x008888);        
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
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