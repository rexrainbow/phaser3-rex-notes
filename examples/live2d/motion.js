import phaser from 'phaser/src/phaser.js';
import Live2dPlugin from '../../plugins/live2d-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.script('live2d', 'assets/live2d/core/live2dcubismcore.js');
        this.load.rexLive2d('Haru', 'assets/live2d/Haru/Haru.model3.json');
    }

    create() {
        var x = 1920 / 2,
            y = 1080 / 2;

        var obj = this.add.rexLive2d(x, y, 'Haru')
            .setScale(0.6)
            .setRandomExpression()

        console.log('Expressions:', obj.getExpressionNames());
        console.log('Motions:', obj.getMotionNames());

        var print = this.add.text(0, 0, '', { fontSize: 36 });
        print.text = obj.expressionName;

        AddButton(this, 0, 50, 'Random expression', function () {
            obj.setRandomExpression();
            print.text = obj.expressionName;
        })

        AddButton(this, 0, 250, 'Random motion', function () {
            obj.startMotion('TapBody');
        })
    }

    update() {
    }
}

var AddButton = function (scene, x, y, text, onClick) {
    return scene.add.text(x, y, text, {
        fontSize: 36, backgroundColor: 'gray', padding: { left: 20, right: 20, top: 20, bottom: 20 }
    })
        .setInteractive()
        .on('pointerdown', onClick)
        .on('pointerover', function () {
            this.setColor('red')
        })
        .on('pointerout', function () {
            this.setColor('white')
        })
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexLive2d',
                plugin: Live2dPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);