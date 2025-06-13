import phaser from 'phaser/src/phaser.js';
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

        var leftTopPanel = this.add.rectangle(400, 300, 200, 200, 0xffffff)
            .setStrokeStyle(4, 0x00ff00);

        this.plugins.get('rexAnchor').add(leftTopPanel, {
            left: 'left+10',
            top: 'top+10',

            width: '30%',
            //height: '30%',

            // aspectRatio: true
          
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