import RoundrRctanglePlugin from '../../plugins/roundrectangle-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var rect0 = this.add.rexRoundRectangle(400, 150, 240, 100, 50, 0x008888).setScale(0, 1);

        this.tweens.add({
            targets: rect0,
            scaleX: 1, // '+=100'
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 2000,
            repeat: -1, // -1: infinity
            yoyo: true
        });

        var rect1 = this.add.rexRoundRectangle(400, 300, 0, 0, 30, 0x008888);

        this.tweens.add({
            targets: rect1,
            width: '+=200', // '+=100'
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 2000,
            repeat: -1, // -1: infinity
            yoyo: true
        });    
        
        var rect2 = this.add.rexRoundRectangle(400, 450, 100, 100, 0, 0x008888);

        this.tweens.add({
            targets: rect2,
            radius: '+=50', // '+=100'
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 2000,
            repeat: -1, // -1: infinity
            yoyo: true
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