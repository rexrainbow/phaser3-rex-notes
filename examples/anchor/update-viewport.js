import 'phaser';
import AnchorPlugin from '../../plugins/anchor-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var bg = this.add.image(400, 300, 'classroom');

        var leftTopPanel = this.add.rectangle(400, 300, 50, 100, 0xffffff)
            .setStrokeStyle(4, 0x00ff00);

        var graphics = this.add.graphics();
        this.plugins.get('rexAnchor').add(leftTopPanel, {
            left: 'left+10',
            top: 'top+10',

            onUpdateViewportCallback: function (viewport, gameObject, anchor) {
                var centerX = viewport.centerX,
                    centerY = viewport.centerY;
                viewport.width *= 0.8;
                viewport.height *= 0.9;
                viewport.centerX = centerX;
                viewport.centerY = centerY;

                // For debug
                graphics
                    .clear()
                    .lineStyle(2, 0xff0000)
                    .strokeRectShape(viewport)
            }
        });

    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexAnchor',
            plugin: AnchorPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);