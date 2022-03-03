import phaser from 'phaser/src/phaser.js';
import CanvasFrameManagerPlugin from '../../plugins/canvasframemanager-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var canvasFrames = this.plugins.get('rexCanvasFrameManager').add(this, 'test', 512, 512, 64, 64);

        var txt = this.make.text({
            add: false,
            style: {
                align: 'center',
                fontSize: 64,
                fixedWidth: 64,
                fixedHeight: 64,
                testString: '回'
            }
        });

        var characters = '兒童樂園';
        for (var i = 0, cnt = characters.length; i < cnt; i++) {
            var c = characters.charAt(i);
            txt.setText(c)
            canvasFrames.paste(c, txt);
        }
        canvasFrames.updateTexture();

        for (var i = 0, cnt = characters.length; i < cnt; i++) {
            var c = characters.charAt(i);
            this.add.image(300 + i * 64, 300, 'test', c);
        }
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexCanvasFrameManager',
            plugin: CanvasFrameManagerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);