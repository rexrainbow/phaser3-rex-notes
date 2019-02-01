import TouchStatePlugin from '../../plugins/touchstate-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.image('bg', 'assets/images/white-dot.png');
    }

    create() {
        var star;
        var bg = this.add.image(400, 300, 'bg')
            .setDisplaySize(300, 300)
            .setTint(0xcccccc);
        bg.touchState = this.plugins.get('rexTouchState').add(bg)
            .on('touchmove', function (pointer) {
                star.x += this.dx;
                star.y += this.dy;
            });

        star = this.add.image(400, 300, 'bg')
            .setDisplaySize(10, 10)
            .setTint(0xff0000);
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
            key: 'rexTouchState',
            plugin: TouchStatePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);