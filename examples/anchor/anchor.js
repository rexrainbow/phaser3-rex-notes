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
            .setStrokeStyle(4, 0xff0000)
            .setOrigin(0, 0);
        this.plugins.get('rexAnchor').add(leftTopPanel, {
            x: 'left+10',
            y: 'top+10'
        });


        var rightTopPanel = this.add.rectangle(400, 300, 50, 100, 0xffffff)
            .setStrokeStyle(4, 0x00ff00)
            .setOrigin(1, 0);
        this.plugins.get('rexAnchor').add(rightTopPanel, {
            x: 'right-10',
            y: 'top+10'
        });

        var leftBottomPanel = this.add.rectangle(400, 300, 50, 100, 0xffffff)
            .setStrokeStyle(4, 0x0000ff)
            .setOrigin(0, 1);
        this.plugins.get('rexAnchor').add(leftBottomPanel, {
            x: 'left+10',
            y: 'bottom-10'
        });

        var rightBottomPanel = this.add.rectangle(400, 300, 50, 100, 0xffffff)
            .setStrokeStyle(4, 0x888888)
            .setOrigin(1, 1);
        this.plugins.get('rexAnchor').add(rightBottomPanel, {
            x: 'right-10',
            y: 'bottom-10'
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