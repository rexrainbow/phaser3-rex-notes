import phaser from 'phaser/src/phaser.js';
import CanvasFrameManagerPlugin from '../../plugins/canvasframemanager-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        // TODO : remove this line
        this.load.image('classroom', 'assets/images/phaser-dude.png');
    }

    create() {
        var useDynamicTexture = true;
        var frameManager = this.plugins.get('rexCanvasFrameManager').add(this,
            {
                key: 'test',
                width: 512, height: 512,
                cellWidth: 64, cellHeight: 64,
                fillColor: (useDynamicTexture) ? 0x666666 : '#666666',
                useDynamicTexture: useDynamicTexture,
            });

        // Show texture
        this.add.image(800, 600, 'test').setOrigin(1).setScale(0.5);

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
        var characters = '兒童樂園';
        for (var i = 0, cnt = characters.length; i < cnt; i++) {
            var c = characters.charAt(i);
            txt.setText(c)
            frameManager.paste(c, txt);
        }
        frameManager.updateTexture();

        // Show frame by Image
        for (var i = 0, cnt = characters.length; i < cnt; i++) {
            var c = characters.charAt(i);
            this.add.image(50 + i * 64, 50, 'test', c);
        }

        // Add frames to bitmapfont, for bitmaptext
        frameManager.addToBitmapFont();
        this.add.bitmapText(50, 100, 'test', '兒樂童園')
            .setScale(0.5)
            .setCharacterTint(0, 1, false, 0xff0000)
            .setCharacterTint(-1, 1, false, 0x0000ff)
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