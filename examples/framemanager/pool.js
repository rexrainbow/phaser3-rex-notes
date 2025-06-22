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
        var useDynamicTexture = true;
        var frameManagerPool = this.plugins.get('rexCanvasFrameManager').addPool(this,
            {
                key: 'test',
                width: 128, height: 128,
                cellWidth: 64, cellHeight: 64,
                fillColor: (useDynamicTexture) ? 0x666666 : '#666666',
                useDynamicTexture: useDynamicTexture,
            });

        // A text object for drawing character
        var txt = this.make.text({
            add: false,
            style: {
                align: 'center',
                fontSize: 64,
                fixedWidth: 64,
                fixedHeight: 64,
                padding: { top: 4 },
                testString: '回'
            }
        });

        // Draw character on text object then paste to canvas texture
        var characters = '兒童樂園雲霄飛車旋轉木馬';
        for (var i = 0, cnt = characters.length; i < cnt; i++) {
            var c = characters.charAt(i);
            txt.setText(c)
            frameManagerPool.paste(c, txt);
        }
        frameManagerPool.updateTexture();

        // Show frame by Image
        for (var i = 0, cnt = characters.length; i < cnt; i++) {
            var c = characters.charAt(i);
            var key = frameManagerPool.getKey(c)
            this.add.image(50 + i * 64, 50, key, c);
        }

        // Show texture
        var keys = frameManagerPool.getKeys();
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.add.image(800, 400 + (i * 72), keys[i], '__BASE').setOrigin(1, 1).setScale(0.5);
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