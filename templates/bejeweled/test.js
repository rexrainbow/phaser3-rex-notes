import Bejeweled from './Bejeweled.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        debugger
        this.bejeweled = new Bejeweled(this, {
            debug: true,
            board: {
                grid: {
                    gridType: 'quadGrid',
                    x: 30,
                    y: 30,
                    cellWidth: 60,
                    cellHeight: 60,
                    type: 'orthogonal' // 'orthogonal'|'isometric'|'staggered'
                },
                width: 10,
                height: 10
            },
            match: {
                // wildcard: undefined
                // dirMask: undefined
            },
            chess: {
                symbols: [],                
                create: undefined,
                scope: undefined,
            }
        });
        this.bejeweled.start();
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);