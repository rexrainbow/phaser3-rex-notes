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
        this.plugins.get('rexAnchor').add(leftTopPanel, {
            left: 'left+10',
            top: 'top+10'
        });

        var rightTopPanel = this.add.rectangle(400, 300, 50, 100, 0xffffff)
            .setStrokeStyle(4, 0x00ff00)
        this.plugins.get('rexAnchor').add(rightTopPanel, {
            right: 'right-10',
            top: 'top+10'
        });

        var leftBottomPanel = this.add.rectangle(400, 300, 50, 100, 0xffffff)
            .setStrokeStyle(4, 0x0000ff)
        this.plugins.get('rexAnchor').add(leftBottomPanel, {
            left: 'left+10',
            bottom: 'bottom-10'
        });

        var rightBottomPanel = this.add.rectangle(400, 300, 50, 100, 0xffffff)
            .setStrokeStyle(4, 0x888888)
        this.plugins.get('rexAnchor').add(rightBottomPanel, {
            right: 'right-10',
            bottom: 'bottom-10'
        });

        var leftCenterPanel = this.add.rectangle(400, 300, 50, 100, 0xffffff)
            .setStrokeStyle(4, 0xff8888)
        this.plugins.get('rexAnchor').add(leftCenterPanel, {
            left: 'left+10',
            centerY: 'center+10'
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